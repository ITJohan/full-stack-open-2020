import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog
} from './reducers/blogReducer'
import {setNotification} from './reducers/notificationReducer'
import {useDispatch, useSelector} from 'react-redux'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      dispatch(setNotification({
        content: 'Logged in',
        color: 'green'
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        content: 'Wrong credentials',
        color: 'red'
      }, 3))
    }
  }

  const handleLogout = async e => {
    e.preventDefault()
    try {
      window.localStorage.removeItem('blogUser')
      setUser(null)
    } catch (expection) {
      dispatch(setNotification({
        content: 'Failed to logout',
        color: 'red'
      }, 3))
    }
  }

  const addBlog = blogObject => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification({
        content: 'Blog added!',
        color: 'green'
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        content: 'Error creating blog',
        color: 'red'
      }, 3))
    }

    blogFormRef.current.toggleVisibility()
  }

  const addLike = async blog => {
    try {
      // const updatedBlog = {
      //   user: blog.user.id,
      //   author: blog.author,
      //   title: blog.title,
      //   url: blog.url,
      //   likes: blog.likes + 1
      // }

      // await blogService.update(blog.id, updatedBlog)
      // const blogs = await blogService.getAll()
      // dispatch(initializeBlogs(blogs))
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(setNotification({
        content: 'Failed to add like',
        color: 'red'
      }, 3))
    }
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification({
          content: 'Removed blog',
          color: 'green'
        }, 3))
      } catch (exception) {
        dispatch(setNotification({
          content: 'Failed to remove blog',
          color: 'red'
        }, 3))
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
        {notification &&
          <Notification notification={notification} />
        }
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
      {notification &&
        <Notification notification={notification} />
      }
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