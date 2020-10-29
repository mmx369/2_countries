import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    async function getWeather() {
      try {
        const dataWeather = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        setWeather(dataWeather.data.current)
      } catch (e) {
        console.log(e);
      }
    }
    getWeather()
  }, [country.capital]);

  const weatherBlock = () => {
    return (
      <div>
        <strong>temperature</strong>: { weather.temperature} Celcius < br />
        <img src={weather.weather_icons} alt='weather' /><br />
        <strong>wind:</strong> { `${weather.wind_speed} mph direction ${weather.wind_dir}`}
      </div>
    )
  }

  const countryPopulation = country.population.toLocaleString().replace(/,/g, " ")

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital: {country.capital}<br />
        population: {countryPopulation}
      </p>
      <h3>languages</h3>
      <div>
        {country.languages.map((el) => <li key={el.name}>{el.name}</li>)}
      </div>
      <p>
        <img src={country.flag} height="100" width="150" alt={`flag of ${country.name}`} />
      </p>
      <h3>weather in {country.capital} </h3>
      {weather && weatherBlock()}
    </div>
  )
}

export default Country
