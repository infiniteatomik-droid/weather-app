import React, { useState } from "react";

interface WeatherData {
  nameCity: string;
  temperature: number;
  airHumidity: number;
  weather: string;
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
const [searchCity, setSearchCity] = useState('');

function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSearchCity(e.target.value);
};
const fetchWeather = async() => {
  try {
  const res = await fetch('');
  const data = await res.json() as WeatherData;
  setWeather(data);
  } catch(err) {
    console.error("Opps, whats went wrong:", err);
  }
}
  return(
    <div>
      <input
      onChange={handleSearchChange}
      value={searchCity}
      />
      <button
      onClick={fetchWeather}
      >Search
      </button>
      {weather ? <div>City: {weather.nameCity}, Temperature: {weather.temperature}</div> :
      <p>Data is not allowed yet</p>}
    </div>
  )
}
