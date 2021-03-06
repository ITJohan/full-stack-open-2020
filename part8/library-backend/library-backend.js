const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://Johan:fullstack@cluster0-wnj36.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_A_SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let filteredBooks = [...books]
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        let author = await Author.findOne({name: args.author})
        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1
          })
        } else {
          author.bookCount = author.bookCount + 1
        }

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        let book = {
          ...args,
          author
        }

        book = new Book(book)

        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubsub.publish('BOOK_ADDED', {bookAdded: book})

        return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({name: args.name})
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({...args})

      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({url, subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})