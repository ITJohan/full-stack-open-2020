import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {logoutUser} from '../reducers/loginReducer'
import {setNotification} from '../reducers/notificationReducer'

const Navigation = () => {
  const style = {
    logo: {
      fontSize: '36px',
      flexGrow: 1
    },
    ul: {
      backgroundColor: 'grey',
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      listStyleType: 'none',
      padding: '0'
    },
    li: {
      textAlign: 'center',
      margin: '5px',
    },
    button: {
      marginLeft: '10px'
    },
    a: {
      textDecoration: 'none',
      color: 'white'
    }
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
      <ul style={style.ul}>
        <li style={{...style.logo, ...style.li}}>
          Blog app
        </li>
        <li style={style.li}>
          <Link style={style.a} to='/blogs'>
            blogs
          </Link>
        </li>
        <li style={style.li}>
          <Link style={style.a} to='/users'>
            users
          </Link>
        </li>
        <li style={style.li}>
          {loggedInUser.name} logged in
          <button style={style.button} onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation