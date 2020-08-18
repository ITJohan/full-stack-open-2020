import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    case 'INIT_USER':
      return action.data
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({username, password})
    await blogService.setToken(user.token)
    window.localStorage.setItem('blogUser', JSON.stringify(user))

    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    await blogService.setToken('')
    window.localStorage.removeItem('blogUser')

    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    let user = window.localStorage.getItem('blogUser')

    if (user) {
      user = JSON.parse(user)
      await blogService.setToken(user.token)

      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export default loginReducer