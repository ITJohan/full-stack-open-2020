import React from 'react'

const notificationStyle = {
  color: 'green',
  backgroundColor: 'lightgrey',
  border: '1px solid green'
}

const Notification = ({ message }) => {
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