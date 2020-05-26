import React from 'react'

const Numbers = ({ persons }) => {
  return (
    persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  )
} 

export default Numbers