const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, {})
}

const mostBlogs = (blogs) => {
  const authorCount = _.toPairs(_.countBy(blogs, (blog) => blog.author))
                      .map(arr => ({name: arr[0], blogs: arr[1]}))
  return _.maxBy(authorCount, author => author.blogs)
}

const mostLikes = (blogs) => {
  const authorLikes = _.toPairs(_.groupBy(blogs, (blog) => blog.author))
                      .map(arr => {
                        return {
                          name: arr[0],
                          likes: arr[1].reduce((sum, curr) => sum + curr.likes, 0)
                        }
                      })
  return _.maxBy(authorLikes, author => author.likes)
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}