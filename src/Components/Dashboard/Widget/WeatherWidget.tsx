import { useEffect, useState } from "react";
import { Card, Spinner, Form } from "react-bootstrap";

import {
  BsSunFill,
  BsCloudFill,
  BsCloudRainFill,
  BsThermometerHalf,
  BsDroplet,
  BsWind,
} from "react-icons/bs";
import "./Weatherwidget.css";

type City = {
  name: string;
  lat: number;
  lon: number;
};

type WeatherData = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

const CITIES: City[] = [
  { name: "Chennai, India", lat: 13.0827, lon: 80.2707 },
  { name: "Delhi, India", lat: 28.6139, lon: 77.2090 },
  { name: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
  { name: "Bengaluru, India", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata, India", lat: 22.5726, lon: 88.3639 },
  { name: "New York, USA", lat: 40.7128, lon: -74.006 },
  { name: "London, UK", lat: 51.5072, lon: -0.1276 },
  { name: "Tokyo, Japan", lat: 35.6895, lon: 139.6917 },
  { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708 },
];

export default function Weatherwidget() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,windspeed_10m,weather_code`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.windspeed_10m),
          weatherCode: data.current.weather_code,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCity]);

  const getIcon = (code: number) => {
    if (code < 3) return <BsSunFill className="weather-icon" />;
    if (code < 60) return <BsCloudFill className="weather-icon" />;
    return <BsCloudRainFill className="weather-icon" />;
  };

  return (
    <Card className="weather-card text-white border-0 mb-4">
      <Card.Body className="d-flex flex-column gap-3">

        {/* City Selector */}
        <Form.Select
          className="city-select"
          value={selectedCity.name}
          onChange={(e) =>
            setSelectedCity(
              CITIES.find((c) => c.name === e.target.value)!
            )
          }
        >
          {CITIES.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
          
        </Form.Select>

        {/* Main weather */}
        <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
          <div>

            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              <>
                <div className="temperature">
                  {weather?.temperature}
                  <span className="degree">°C</span>
                </div>

                <div className="date">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </>
            )}
          </div>

          <div className="icon-wrapper">
            {!loading && weather && getIcon(weather.weatherCode)}
          </div>
        </div>

        {/* Toggle */}
        {!loading && weather && (
          <>
            <button
              className="details-toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#weatherDetails"
              aria-expanded="false"
              aria-controls="weatherDetails"
            >
              <span>Weather details</span>
              <i className="bi bi-chevron-down"></i>
            </button>

            <div className="collapse" id="weatherDetails">
              <div className="weather-stats mt-2">
                <div>
                  <BsThermometerHalf /> Feels like{" "}
                  <strong>{weather.feelsLike}°C</strong>
                </div>
                <div>
                  <BsDroplet /> Humidity{" "}
                  <strong>{weather.humidity}%</strong>
                </div>
                <div>
                  <BsWind /> Wind{" "}
                  <strong>{weather.windSpeed} km/h</strong>
                </div>
              </div>
            </div>
          </>
        )}

      </Card.Body>
    </Card>
  );
}
