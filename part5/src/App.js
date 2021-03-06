import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('blogUser')
    if (user) {
      user = JSON.parse(user)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationColor('green')
      setNotification('Logged in')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotificationColor('red')
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = async e => {
    e.preventDefault()
    try {
      window.localStorage.removeItem('blogUser')
      setUser(null)
    } catch (expection) {
      // TODO: Error message
    }
  }

  const addBlog = async blogObject => {
    try {
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotificationColor('green')
      setNotification('Blog added!')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotificationColor('red')
      setNotification('Error creating blog')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }

    blogFormRef.current.toggleVisibility()
  }

  const addLike = async blog => {
    try {
      const updatedBlog = {
        user: blog.user.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1
      }

      await blogService.update(blog.id, updatedBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setNotificationColor('red')
      setNotification('Failed to add like')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const removeBlog = async blog => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotificationColor('green')
        setNotification('Removed blog')
        setTimeout(() => setNotification(null), 3000)
      } catch (exception) {
        setNotificationColor('red')
        setNotification('Failed to remove blog')
        setTimeout(() => setNotification(null), 3000)
      }
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="New note" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification msg={notification} color={notificationColor} />
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification msg={notification} color={notificationColor} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog)}
          removeHandler={user.id === blog.user.id ? () => removeBlog(blog) : null}
        />
      )}
    </div>
  )
}

export default App