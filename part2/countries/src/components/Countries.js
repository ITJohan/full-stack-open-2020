import React from 'react'

const Countries = ({ countries, setFilteredCountries }) => {
  return (
    <>
      {countries.map(country => 
        <div key={country.name}>
          {country.name} 
          <button onClick={() => setFilteredCountries([country])}>Show</button>
        </div>
      )}
    </>
  )
}

export default Countries