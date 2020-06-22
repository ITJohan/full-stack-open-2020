const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  blogsInDb
}