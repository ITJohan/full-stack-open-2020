const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (data, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default notificationReducer