import React from 'react'

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country
  return (
    <>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={flag} width='200px' alt={`${name}'s flag`} />
    </>
  )
}

export default Country