// hooks/useWeather.js
import { useState, useEffect } from "react";
import { formatAirQuality, formatUVIndex } from "../utils/formatter";

export default function useWeather() {
  const [temp, setTemp] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [locationDoc, setLocationDoc] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;

      try {
        const [weatherRes, airRes, uvRes, kakaoRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c913076005907aa5d79cd0fdc643b55d`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c913076005907aa5d79cd0fdc643b55d`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=c913076005907aa5d79cd0fdc643b55d`
          ),
          fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
            {
              headers: {
                Authorization: `KakaoAK fa404c9f620f1b5af3192f1def32356a`,
              },
            }
          ),
        ]);

        const [weatherData, airData, uvData, kakaoData] = await Promise.all([
          weatherRes.json(),
          airRes.json(),
          uvRes.json(),
          kakaoRes.json(),
        ]);

        setTemp(Math.round(weatherData.main.temp));
        setHumidity(weatherData.main.humidity);
        setAirQuality(formatAirQuality(airData.list[0].main.aqi));
        setUvIndex(formatUVIndex(uvData.value));
        setWeatherCondition(weatherData.weather[0].main);

        const doc = kakaoData.documents?.[0];
        if (doc) setLocationDoc(doc);
      } catch (err) {
        console.error("날씨 정보 로딩 실패:", err);
      }
    });
  }, []);

  return { temp, airQuality, uvIndex, humidity, locationDoc, weatherCondition };
}
