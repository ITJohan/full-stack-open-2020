import React from 'react'
import Button from './Button'
import Input from './Input'

const Form = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form>
      <Input text='Name' value={newName} changeHandler={handleNameChange} />
      <Input text='Number' value={newNumber} changeHandler={handleNumberChange} />
      <Button text='Add' submitHandler={handleSubmit} />
    </form>
  )
}

export default Form