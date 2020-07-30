const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

let timeoutId = null

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification
      }
    })

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          notification: ''
        }
      })
    }, duration * 1000)
  }
}

export default notificationReducer