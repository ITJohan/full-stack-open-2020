const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification
      }
    })

    await new Promise(resolve => setTimeout(resolve, duration * 1000))

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification: ''
      }
    })
  }
}

export default notificationReducer