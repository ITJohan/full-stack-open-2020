import React from 'react'

const Input = ({ text, value, changeHandler }) => {
  return (
    <div>
      {text}: <input value={value} onChange={changeHandler} />
    </div>
  )
}

export default Input