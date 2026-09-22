import React, { useState } from "react";
import {getWeatherCondition} from '../utils/weatherCodes';
import './App.css';
interface WeatherData {
  nameCity: string;
  temperature: number;
  airHumidity: number;
  weather: number;
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchCity(e.target.value);
  }

  const fetchWeather = async () => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1&language=en`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City is not found!");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
      );
      const weatherData = await weatherRes.json();

      const formattedData: WeatherData = {
        nameCity: name,
        temperature: Math.round(weatherData.current.temperature_2m),
        airHumidity: weatherData.current.relative_humidity_2m,
        weather: weatherData.current.weather_code,
      };

      setWeather(formattedData);
    } catch (err) {
      console.error("Opps, whats went wrong:", err);
      alert('Opps, whats went wrong, you may check the console!')
    } finally {
      setLoading(false);
    }
  };
      return (
    <div className="weather-container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter city..." 
          className="search-input"
          value={searchCity}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={fetchWeather}>
          Search
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {weather && (
        <div className="weather-info">
          <h2 className="city-name">{weather.nameCity}</h2>
          
          <div className="temperature">
            {weather.temperature}
          </div>
          
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weather.airHumidity}%</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Condition</div>
              <div className="detail-value">{getWeatherCondition(weather.weather)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}