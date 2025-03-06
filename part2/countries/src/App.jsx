import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ text, value, onChange }) => (
  <>
    {text} <input value={value} onChange={onChange} />
  </>
)

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!capital || !API_KEY) {
      console.warn("Missing capital or API Key");
      return;
    }

    const city = Array.isArray(capital) ? capital[0] : capital;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    console.log("Fetching weather for:", city);

    axios.get(url)
      .then(response => {
        console.log("Weather API Response:", response.data);
        setWeather(response.data);
      })
      .catch(error => console.error("Error fetching weather data:", error.response?.data || error.message));
  }, [capital, API_KEY]);  

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description}
      />
      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
    </div>
  );
};

const CountryDetail = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p><strong>Capital:</strong> {country.capital}</p>
    <p><strong>Area:</strong> {country.area} km²</p>

    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>

    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />

    {/* Weather Component */}
    <Weather capital={country.capital} />
  </div>
)

const CountryList = ({ countries, handleShow }) => (
  <ul>
    {countries.map(country => (
      <li key={country.name.common}>
        {country.name.common} 
        {countries.length <= 10 && <button onClick={() => handleShow(country)}>Show</button>}
      </li>
    ))}
  </ul>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)  
      })
      .catch(error => console.error("Error fetching data:", error))
  }, [])

  const filteredCountries = newFilter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )
    : countries 

  const handleChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountry(null)  
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleChange} text="Find countries: " />
      
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <>
          {newFilter && filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length === 1 ? (
            <CountryDetail country={filteredCountries[0]} />
          ) : (
            <CountryList countries={filteredCountries} handleShow={handleShow} />
          )}
        </>
      )}
    </div>
  )
}

export default App
