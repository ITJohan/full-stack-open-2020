import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{name: 'Arto Hellas'}])
  const [ newName, setNewName ] = useState('')

  const handleChange = e => {
    setNewName(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newPerson = {
      name: newName
    }
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <div>Debug: {newName}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App