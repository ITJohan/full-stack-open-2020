import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    backgroundColor: 'lightgrey',
    color: notification.color,
    textAlign: 'center',
    border: `2px solid ${notification.color}`
  }

  return (
    <div style={style} id='notification'>
      <p>{notification.content}</p>
    </div>
  )
}

export default Notification