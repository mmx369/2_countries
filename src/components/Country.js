import React, { useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState('')

  async function getWeather() {
    try {
      const dataWeather = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      setWeather(dataWeather)
    } catch (e) {
      console.log(e);
    }
  }
  getWeather()

  console.log(666666, weather);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital: {country.capital}<br />
        population: {country.population}
      </p>
      <h3>languages</h3>
      <div>
        {country.languages.map((el) => <li key={el.name}>{el.name}</li>)}
      </div>
      <p>
        <img src={country.flag} height="100" width="150" alt={`flag of ${country.name}`} />
      </p>
      <h3>weather in {country.capital} </h3>
      {/* temperature: {weather.data.current.temperature} */}
    </div>

  )
}

export default Country
