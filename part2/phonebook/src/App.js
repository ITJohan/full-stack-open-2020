import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Input from './components/Input'
import Numbers from './components/Numbers'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([ ...persons, returnedPerson ])
        setFilter('')
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Input text='Filter shown with' value={filter} changeHandler={handleFilterChange} />
      <h2>Add a new</h2>
      <Form 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {filter === '' ?
       <Numbers persons={persons} /> :
       <Numbers persons={filteredPersons} />
      }
    </div>
  )
}

export default App