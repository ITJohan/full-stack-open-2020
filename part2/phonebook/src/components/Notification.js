import React from 'react'

const Notification = ({ message, color }) => {
  const notificationStyle = {
    color,
    backgroundColor: 'lightgrey',
    border: `1px solid ${color}`
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification