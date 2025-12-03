// ToWear.jsx
import React, { useState, useEffect } from "react";
import { MapPinned, ThermometerSun } from "lucide-react";
import { IoWaterSharp, IoSunnyOutline } from "react-icons/io5";
import { WiDust } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import "./ToWear.css";

const clothingOptions = [
  {
    range: [-20, 0],
    label: "추운 날씨",
    items: [
      {
        name: "두꺼운 패딩",
        image: "/images/패딩.jfif",
      },
      {
        name: "롱코트",
        image: "/images/롱코트.jfif",
      },
      {
        name: "목도리",
        image: "/images/목도리.jfif",
      },
      {
        name: "기모 바지",
        image: "/images/기모바지.jfif",
      },
      {
        name: "부츠",
        image: "/images/어그부츠.jfif",
      },
    ],
    description: "추운 겨울을 위한 옷",
  },
  {
    range: [1, 9],
    label: "쌀쌀한 날씨",
    items: [
      {
        name: "자켓",
        image: "/images/자켓.jfif",
      },
      {
        name: "니트",
        image: "/images/니트.jfif",
      },
      {
        name: "청바지",
        image: "/images/청바지.jfif",
      },
      {
        name: "운동화",
        image: "/images/운동화.jfif",
      },
    ],
    description: "쌀쌀한 날씨를 위한 옷",
  },
  {
    range: [10, 20],
    label: "적당한 날씨",
    items: [
      {
        name: "맨투맨",
        image: "/images/맨투맨.jfif",
      },
      {
        name: "긴바지",
        image: "/images/긴바지.jfif",
      },
      {
        name: "스니커즈",
        image: "/images/스니커즈.jfif",
      },
    ],
    description: "적당한 두께의 옷",
  },
  {
    range: [21, 29],
    label: "조금 더운 날씨",
    items: [
      {
        name: "반팔",
        image: "/images/반팔티.jfif",
      },
      {
        name: "얇은 바지",
        image: "/images/얇은바지.jfif",
      },
      {
        name: "샌들",
        image: "/images/샌들.jfif",
      },
    ],
    description: "가볍고 시원한 옷",
  },
  {
    range: [30, 40],
    label: "무더운 날씨",
    items: [
      {
        name: "민소매",
        image: "/images/나시티.jfif",
      },
      {
        name: "반바지",
        image: "/images/반바지.jfif",
      },
      {
        name: "슬리퍼",
        image: "/images/슬리퍼.jfif",
      },
    ],
    description: "무더운 여름을 위한 옷",
  },
];

// 현재 온도 기준 슬라이더 초기값
const tempToSlider = (t) => {
  if (t <= 0) return 10; // 추운 날씨 중앙
  if (t <= 9) return 30; // 쌀쌀한 날씨 중앙
  if (t <= 20) return 50; // 적당한 날씨 중앙
  if (t <= 29) return 70; // 조금 더운 날씨 중앙
  return 90; // 무더운 날씨 중앙
};

export default function ToWear() {
  const [temp, setTemp] = useState(null);
  const [location, setLocation] = useState("위치 불러오는 중...");
  const [sliderValue, setSliderValue] = useState(tempToSlider(temp));
  const [airQuality, setAirQuality] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const formatAirQuality = (aqi) => {
    switch (aqi) {
      case 1:
        return "좋음";
      case 2:
        return "보통";
      case 3:
        return "약간 나쁨";
      case 4:
        return "나쁨";
      case 5:
        return "매우 나쁨";
      default:
        return "-";
    }
  };

  const formatUVIndex = (uv) => {
    if (uv < 3) return "낮음";
    if (uv < 6) return "보통";
    if (uv < 8) return "높음";
    if (uv < 11) return "매우 높음";
    return "위험";
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // 1. 현재 온도 및 습도
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c913076005907aa5d79cd0fdc643b55d`
      );
      const weatherData = await weatherRes.json();
      setTemp(Math.round(weatherData.main.temp));
      setHumidity(weatherData.main.humidity);

      // 2. 미세먼지
      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c913076005907aa5d79cd0fdc643b55d`
      );
      const airData = await airRes.json();
      setAirQuality(formatAirQuality(airData.list[0].main.aqi)); // 1~5

      // 3. UV 지수
      const uvRes = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=c913076005907aa5d79cd0fdc643b55d`
      );
      const uvData = await uvRes.json();
      setUvIndex(formatUVIndex(uvData.value));

      const kakaoRes = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK fa404c9f620f1b5af3192f1def32356a`,
          },
        }
      );
      const kakaoData = await kakaoRes.json();
      const doc = kakaoData.documents?.[0];

      if (doc) {
        setLocation(
          `${doc.region_1depth_name} ${doc.region_2depth_name} ${doc.region_3depth_name}`
        );
      }
    });
  });

  // 슬라이더 구간별 옷 선택
  const getClothingIndex = () => {
    if (sliderValue <= 20) return 0; // 추운 날씨
    if (sliderValue <= 40) return 1; // 쌀쌀한 날씨
    if (sliderValue <= 60) return 2; // 적당한 날씨
    if (sliderValue <= 80) return 3; // 조금 더운 날씨
    return 4; // 무더운 날씨
  };

  const currentClothes = clothingOptions[getClothingIndex()];

  const getGrandientColor = (value) => {
    if (value <= 50) {
      // 0부터 50까지: 깊은 파랑(70, 100, 150)에서 청록색(100, 150, 150)으로
      const ratio = value / 50;
      const r = Math.round(70 + (100 - 70) * ratio);
      const g = Math.round(100 + (150 - 100) * ratio);
      const b = Math.round(150 + (150 - 150) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // 50부터 100까지: 청록색(100, 150, 150)에서 RGB(244, 171, 93)으로
      const ratio = (value - 50) / 50;
      // R: 100 -> 244
      const r = Math.round(100 + (244 - 100) * ratio);
      // G: 150 -> 171
      const g = Math.round(150 + (171 - 150) * ratio);
      // B: 150 -> 93
      const b = Math.round(150 + (93 - 150) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  return (
    <div className="container">
      <h1 className="title">오늘의 옷 추천</h1>

      <div className="weather-wrapper">
        <div className="card temp-card">
          {/* <h2>오늘 기온</h2> */}
          <h2>
            <MapPinned /> {location}
          </h2>
          <h2>
            {" "}
            <ThermometerSun />{" "}
            {temp !== null ? `${temp}°C` : "날씨 불러오는 중..."}
          </h2>
          <h1>
            {typeof temp === "number"
              ? temp <= 0
                ? "🥶"
                : temp >= 1 && temp <= 9
                ? "😨"
                : temp >= 10 && temp <= 20
                ? "🙂"
                : temp >= 21 && temp <= 29
                ? "😎"
                : "🥵"
              : "❓"}
          </h1>
        </div>
        <div className="card right-card">
          <h2>오늘 날씨 정보</h2>
          <ul className="weather-info">
            <li>
              <p>
                <FiWind /> 미세먼지 :{" "}
                {airQuality !== null ? airQuality : "불러오는 중..."}
              </p>
            </li>

            <li>
              <p>
                <IoSunnyOutline style={{ color: "orange" }} /> 자외선 지수 :{" "}
                {uvIndex !== null ? uvIndex : "불러오는 중..."}
              </p>
            </li>

            <li>
              <p>
                <IoWaterSharp
                  style={{ width: "18px", height: "18px", color: "blue" }}
                />{" "}
                습도 : {humidity !== null ? `${humidity}%` : "불러오는 중..."}
              </p>
            </li>
          </ul>
          <hr className="line" />
          <div className="hover-text">
            <p>
              {typeof temp === "number"
                ? temp <= 0
                  ? "🧣 오늘은 정말 추워요! 따뜻하게 입고 나가세요 🧤"
                  : temp >= 30
                  ? "🕶️ 무더운 날씨! 시원하게 입고 나가세요 🥤"
                  : "🌤️ 좋은 날씨예요! 가볍게 나가도 괜찮아요 🌤️"
                : "오늘의 날씨를 기다리는 중..."}
            </p>
          </div>
        </div>
      </div>

      <div className="clothes-description">
        <h2>{currentClothes.description}</h2>
      </div>

      <div className="clothes-cards">
        {currentClothes.items.slice(0, 5).map((item, idx) => (
          <div className="card clothes-card" key={idx}>
            <img src={item.image} alt={item.name} className="clothes-image" />
            <p className="card-name">{item.name}</p>
          </div>
        ))}
      </div>

      <div className="slider-box">
        <div className="slider-labels">
          <span>두꺼운 옷</span>
          <span>얇은 옷</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="slider"
        />

        <p
          className="slider-label"
          style={{
            left: `calc(${sliderValue}% -12px)`,
            color: getGrandientColor(sliderValue),
          }}
        >
          슬라이더를 움직여 옷의 두께를 조절하세요
        </p>
      </div>
    </div>
  );
}
