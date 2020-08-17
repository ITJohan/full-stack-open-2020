const listHelper = require('../utils/list_helper')

const listWithNoBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }]

test('dummy returns one', () => {
  expect(listHelper.dummy(listWithNoBlogs)).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.favoriteBlog(listWithNoBlogs)).toEqual({})
  })

  test('of list with one blog equals the one blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('of list with many blogs is the blog with most likes', () => {
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[2])
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostBlogs(listWithNoBlogs)).toEqual(undefined)
  })

  test('of list with one blog equals the one blog author', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      name: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of list with many blogs is the author with most blogs', () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      name: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostLikes(listWithNoBlogs)).toEqual(undefined)
  })

  test('of list with one blog equals the one blogs author', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      name: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of list with many blogs is the author with most total likes', () => {
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({
      name: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})