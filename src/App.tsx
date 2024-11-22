import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

// Type definitions for weather and forecast data
interface WeatherData {
  city: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    temp_max: number; 
    temp_min: number;  
    pressure: number;
    humidity: number;
    feels_like: number;
    sea_level?: number;  
  };
  weather: {
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;  
  };
  wind: {
    speed: number;
  };
}

interface ForecastData {
  city: string;
  list: WeatherItem[];
}

interface SearchData {
  value: string;  
  label: string;  
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  const handleOnSearchChange = (searchData: SearchData | null) => {
    if (!searchData) return;  

    const [lat, lon] = searchData.value.split(" ");

     const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
         if (!response[0].ok || !response[1].ok) {
          throw new Error("Failed to fetch weather data");
        }

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

         setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
      });
  };

  return (
    <div className="container">
      {/* Search Component */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Current Weather Component */}
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {/* Forecast Component */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
