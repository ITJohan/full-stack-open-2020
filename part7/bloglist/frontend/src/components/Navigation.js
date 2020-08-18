import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {logoutUser} from '../reducers/loginReducer'
import {setNotification} from '../reducers/notificationReducer'

const Navigation = () => {
  const ulStyle = {
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'row',
    listStyleType: 'none',
    padding: '0'
  }

  const liStyle = {
    textAlign: 'center',
    margin: '5px'
  }

  const loggedInUser = useSelector(state => state.login)
  const dispatch = useDispatch()

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

  return (
    <nav>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to='/blogs'>
            blogs
          </Link>
        </li>
        <li style={liStyle}>
          <Link to='/users'>
            users
          </Link>
        </li>
        <li style={liStyle}>
          {loggedInUser.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation