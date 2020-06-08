import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Input from './components/Input'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleDelete = oldPerson => {
    const confirmed = window.confirm(`Delete ${oldPerson.name}?`)

    if (confirmed) {
      personService
        .remove(oldPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== oldPerson.id))
          setFilter('')
        })
    }
  }

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
      // Is the person already added
      const shouldReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (shouldReplace) {
        // Update old
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            resetInputs()
            setNotificationMessage(`Updated ${newName}`)
            setTimeout(() => setNotificationMessage(null), 3000)
          })
      } else {
        return
      }
    } else {
      // If not, add new
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([ ...persons, returnedPerson ])
          resetInputs()
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => setNotificationMessage(null), 3000)
        })
    }
  }

  const resetInputs = () => {
    setFilter('')
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} /> 
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
       <Numbers persons={persons} handleDelete={handleDelete} /> :
       <Numbers persons={filteredPersons} handleDelete={handleDelete} />
      }
    </div>
  )
}

export default App