const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'This is the first blog',
    author: 'Johan Lindkvist',
    url: 'http://www.blog.com',
    likes: 43
  },
  {
    title: 'Second blog here',
    author: 'John Doe',
    url: 'http//johnsblog.com',
    likes: 12
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}