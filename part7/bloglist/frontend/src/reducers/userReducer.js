import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'REMOVE':
      return null
    default:
      return state
  }
}

export const setUser = user => {
  return async dispatch => {
    await blogService.setToken(user.token)

    dispatch({
      type: 'SET',
      data: user
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    await blogService.setToken('')

    dispatch({
      type: 'REMOVE'
    })
  }
}

export default userReducer