import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('blogUser')
    if (user) {
      user = JSON.parse(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // TODO: Error message
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App