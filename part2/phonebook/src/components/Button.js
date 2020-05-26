import React from 'react'

const Button = ({ text, submitHandler }) => {
  return (
    <div>
      <button type='submit' onClick={submitHandler}>{text}</button>
    </div>
  )
}

export default Button