import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
      .then(res => {
        setWeather(res.data.current)
      })
    // eslint-disable-next-line
  }, [])

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
      <h2>Weather in {capital}</h2>
      <div><strong>Temperature:</strong> {weather.temperature}° celcius</div>
      <img src={weather.weather_icons} width='50px' alt={`${weather.weather_descriptions} icon`} />
      <div><strong>Wind:</strong> {weather.wind_speed} mph, direction {weather.wind_dir}</div>
    </>
  )
}

export default Country