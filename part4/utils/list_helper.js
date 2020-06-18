const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, {})
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}