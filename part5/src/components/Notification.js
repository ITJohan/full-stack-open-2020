import React from 'react'

const Notification = ({ msg, color }) => {
  const style = {
    backgroundColor: 'lightgrey',
    color: color,
    textAlign: 'center',
    border: `2px solid ${color}`
  }

  if (msg !== null) {
    return (
      <div style={style} id='notification'>
        <p>{msg}</p>
      </div>
    )
  }

  return null
}

export default Notification