import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
        setFilteredCountries(res.data)
      })
  }, [])

  const handleFilterChange = e => {
    const filter = e.target.value
    setFilter(filter)
    setFilteredCountries(countries.filter(country => 
      country.name.toLowerCase().includes(filter.toLowerCase())
    ))
  }

  return (
    <div>
      <div>
        Find countries: <input value={filter} onChange={handleFilterChange} />
      </div>
      {filteredCountries.length > 10 ?
        <div>Too many matches, specify another filter</div> :
        filteredCountries.length === 1 ?
          <Country country={filteredCountries[0]} /> :
          <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries} />
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))