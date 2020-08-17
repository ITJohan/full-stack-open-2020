const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const loginRouter = require('../controllers/login')

const getToken = async () => {
  const loginResult = await api
    .post('/api/login')
    .send({
      username: 'itjohan',
      password: 'fullstack'
    })
    .expect(200) 
    .expect('Content-Type', /application\/json/)
  
  return loginResult.body.token
}

beforeEach(async () => {
  // Init user
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('fullstack', 10)
  const user = new User({ username: 'itjohan', name: 'Johan Lindkvist', passwordHash })

  await user.save()

  // Init blogs
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog({...blog, user: user.id}))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('adding blog without token fails', async () => {
  const newBlog = {
    title: 'A newly created third blog',
    author: 'Pete Simmon',
    url: 'http://www.blogportal.com',
    likes: 94
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of blogs is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const token = await getToken()
  
  const newBlog = {
    title: 'A newly created third blog',
    author: 'Pete Simmon',
    url: 'http://www.blogportal.com',
    likes: 94
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('missing likes property defaults to zero', async () => {
  const token = await getToken()

  const newBlog = {
    title: 'A newly created third blog',
    author: 'Pete Simmon',
    url: 'http://www.blogportal.com'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(blog => blog.likes)
  expect(likes[helper.initialBlogs.length]).toBe(0)
})

test('missing title and url returns 400 bad request', async () => {
  const token = await getToken()

  const newBlog = {}

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const token = await getToken()

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
})

test('creation fails with proper statuscode and message if username is missing', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    name: 'Superuser',
    password: 'pass123'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` is required')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with proper statuscode and message if password is missing', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'jenny',
    name: 'Jenny Doe'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password missing')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'itjohan',
    name: 'Superuser',
    password: 'pass123'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})