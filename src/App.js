import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [countries, setCountry] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [showSingleCountry, setShowSingleCountry] = useState(false);
  const [singleCountry, setSingleCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountry(response.data);
    });
  }, []);

  const handleNameSearch = (event) => {
    setNewSearch(event.target.value);
    setShowSingleCountry(false)
    console.log(event.target.value);
  };

  const filteredCountries = countries.filter((elem) => {
    return (
      elem.name.substr(0, newSearch.length).toLowerCase() ===
      newSearch.toLowerCase()
    );
  });

  const handleShowCountry = (event) => {
    event.preventDefault();
    setShowSingleCountry(true);
    console.log(event.target.value);
    const searchCountry = filteredCountries.filter(
      (el) => el.name === event.target.value
    );
    console.log(55555, searchCountry);
    setSingleCountry(searchCountry[0])
  };

  const renderCountryToShow = () => {
    console.log(22222, filteredCountries);
    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else if (filteredCountries.length >= 10) {
      return 'Too many matches';
    } else {
      return filteredCountries.map((country) => {
        return (
          <li key={country.name}>
            {country.name}{' '}
            <button onClick={handleShowCountry} value={country.name}>
              show
            </button>
          </li>
        );
      });
    }
  };

  return (
    <div>
      <Filter newSearch={newSearch} handleNameSearch={handleNameSearch} />

      <h2>Countries</h2>
      {!showSingleCountry && renderCountryToShow()}
      {showSingleCountry && (<Country country={singleCountry} />)}

    </div>
  );
}

export default App;
