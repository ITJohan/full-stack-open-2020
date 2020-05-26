import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');

  const handleFilterChange = e => {
    const filter = e.target.value

    setFilter(filter)
    setFilteredPersons(persons.filter(person => person.name.includes(filter)))
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setPersons([...persons, newPerson])
    setFilter('')
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <form>
        <h2>Add a new</h2>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter === '' ?
       persons.map(person => <div key={person.name}>{person.name} {person.number}</div>) :
       filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

export default App