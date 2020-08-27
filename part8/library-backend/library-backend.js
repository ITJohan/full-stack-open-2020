const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://Johan:fullstack@cluster0-wnj36.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: String
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
      setBornTo: String!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => 0
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => { // Doesnt have to work
      return Book.find({})
    }, 
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })
        await author.save()
      }

      let book = {
        ...args,
        author
      }

      book = new Book(book)
      console.log(book)

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    editAuthor: (root, args) => { // Doenst have to work
      const author = authors.find(a => a.name === args.name)
      if (!author) return null
      author.born = args.setBornTo
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})