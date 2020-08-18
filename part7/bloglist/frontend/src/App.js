import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import {
  initializeBlogs
} from './reducers/blogReducer'
import {setNotification} from './reducers/notificationReducer'
import {loginUser, logoutUser, initializeUser} from './reducers/loginReducer'
import {initializeUsers} from './reducers/userReducer'

const App = () => {
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
      <div>
        <p>{loggedInUser.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App