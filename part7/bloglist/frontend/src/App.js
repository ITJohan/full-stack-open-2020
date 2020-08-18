import React, { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'

import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog
} from './reducers/blogReducer'
import {setNotification} from './reducers/notificationReducer'
import {loginUser, logoutUser, initializeUser} from './reducers/loginReducer'
import {initializeUsers} from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const notification = useSelector(state => state.notification)
  const loggedInUser = useSelector(state => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      dispatch(loginUser(username, password))
      dispatch(setNotification({
        content: 'Logged in',
        color: 'green'
      }, 3))

      setUsername('')
      setPassword('')
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
      dispatch(logoutUser())
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

  if (loggedInUser === null) {
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
    <Router>
      <h2>Blogs</h2>
      {notification &&
        <Notification notification={notification} />
      }
      <p>
        {loggedInUser.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users blogs={blogs} />
        </Route>
        <Route path='/'>
          {blogForm()}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={() => addLike(blog)}
              removeHandler={loggedInUser.id === blog.user.id ? () => removeBlog(blog) : null}
            />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App