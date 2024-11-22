export interface WeatherMain {
    temp: number;
    temp_max: number; // Ensure it's non-optional here
    temp_min: number; // Ensure it's non-optional here
    pressure: number;
    humidity: number;
    feels_like: number;
    sea_level?: number; // Optional field
  }
  
  export interface Weather {
    description: string;
    icon: string;
  }
  
  export interface Clouds {
    all: number; // Cloudiness percentage
  }
  
  export interface Wind {
    speed: number;
  }
  
  export interface WeatherItem {
    dt: number;
    main: WeatherMain;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
  }
  
  export interface ForecastData {
    city: string;
    list: WeatherItem[];
  }
  
  export interface WeatherData {
    city: string;
    weather: Weather[];
    main: WeatherMain;
    wind: Wind;
  }
  