import React from 'react'

const Numbers = ({ persons, handleDelete }) => {
  return (
    persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button>
      </div>
    )
  )
} 

export default Numbers