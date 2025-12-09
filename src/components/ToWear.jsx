import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinned, ThermometerSun } from "lucide-react";
import { IoWaterSharp, IoSunnyOutline } from "react-icons/io5";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
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
  if (t <= 0) return 10;
  if (t <= 9) return 30;
  if (t <= 20) return 50;
  if (t <= 29) return 70;
  return 90;
};

export default function ToWear() {
  const [temp, setTemp] = useState(null);
  const [location, setLocation] = useState("위치 불러오는 중...");
  const [sliderValue, setSliderValue] = useState(tempToSlider(temp));
  const [airQuality, setAirQuality] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [originalLocationDoc, setOriginalLocationDoc] = useState(null);
  const navigate = useNavigate();

  // 가독성 높은 포맷 함수들
  const formatAirQuality = (aqi) =>
    ["좋음", "보통", "약간 나쁨", "나쁨", "매우 나쁨"][aqi - 1] || "-";
  const formatUVIndex = (uv) =>
    uv < 3
      ? "낮음"
      : uv < 6
      ? "보통"
      : uv < 8
      ? "높음"
      : uv < 11
      ? "매우 높음"
      : "위험";

  const formatLocationByWidth = (doc, width) => {
    if (!doc) return "위치 불러오는 중...";

    let locationString = doc.region_1depth_name;

    if (width > 1194) {
      locationString += ` ${doc.region_2depth_name || ""} ${
        doc.region_3depth_name || ""
      }`;
    } else if (width > 874) {
      locationString += ` ${doc.region_2depth_name || ""}`;
    } else if (width > 768) {
    } else {
      if (width > 378) {
        locationString += ` ${doc.region_2depth_name || ""} ${
          doc.region_3depth_name || ""
        }`;
      } else if (width > 303) {
        locationString += ` ${doc.region_2depth_name || ""}`;
      } else {
      }
    }

    return locationString.trim();
  };

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (originalLocationDoc) {
      setLocation(formatLocationByWidth(originalLocationDoc, windowWidth));
    }
  }, [windowWidth, originalLocationDoc]);

  // ⭐ Promise.all로 네트워크 요청 최적화
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const lat = coords.latitude;
      const lon = coords.longitude;

      try {
        // -------------------------------
        // 병렬 요청 → 성능 향상
        // -------------------------------
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

        // -------------------------------
        // 결과 JSON 파싱도 병렬 처리
        // -------------------------------
        const [weatherData, airData, uvData, kakaoData] = await Promise.all([
          weatherRes.json(),
          airRes.json(),
          uvRes.json(),
          kakaoRes.json(),
        ]);

        // -------------------------------
        // 데이터 세팅
        // -------------------------------
        setTemp(Math.round(weatherData.main.temp));
        setHumidity(weatherData.main.humidity);
        setAirQuality(formatAirQuality(airData.list[0].main.aqi)); // 1~5
        setUvIndex(formatUVIndex(uvData.value));

        // 위치 정보
        const doc = kakaoData.documents?.[0];
        if (doc) {
          setOriginalLocationDoc(doc);
          setLocation(formatLocationByWidth(doc, window.innerWidth));
        }
      } catch (err) {
        console.error("날씨 정보 로딩 실패:", err);
      }
    });
  }, []);

  // 슬라이더 구간별 옷 선택
  const getClothingIndex = () =>
    sliderValue <= 20
      ? 0
      : sliderValue <= 40
      ? 1
      : sliderValue <= 60
      ? 2
      : sliderValue <= 80
      ? 3
      : 4;

  const currentClothes = clothingOptions[getClothingIndex()];

  const getGrandientColor = (value) => {
    if (value <= 50) {
      const ratio = value / 50;
      return `rgb(${70 + 30 * ratio}, ${100 + 50 * ratio}, 150)`;
    } else {
      const ratio = (value - 50) / 50;
      return `rgb(${100 + 144 * ratio}, ${150 + 21 * ratio}, ${
        150 - 57 * ratio
      })`;
    }
  };

  return (
    <div className="towearwrapper">
      <div className="containertowear">
        <div className="app-header">
          {/* <div className="back-button" onClick={() => navigate("/")}>
          ←
        </div> */}
          <h1 className="title">오늘의 옷 추천</h1>
          <div className="right-space"></div>
        </div>
        <div className="weather-wrapper">
          <div className="card temp-card">
            {/* <h2>오늘 기온</h2> */}
            <h3>
              <MapPinned /> {location}
            </h3>
            <h3>
              {" "}
              <ThermometerSun />{" "}
              {temp !== null ? `${temp}°C` : "날씨 불러오는 중..."}
            </h3>
            <h3>
              {typeof temp === "number"
                ? temp <= 0
                  ? "☃ 추운 날씨"
                  : temp >= 1 && temp <= 15
                  ? "❄ 쌀쌀한 날씨"
                  : temp >= 16 && temp <= 25
                  ? "🙂 적당한 날씨"
                  : temp >= 26 && temp <= 29
                  ? "😎 따뜻한 날씨"
                  : "🥵 무더운 날씨"
                : "❓"}
            </h3>
          </div>
          <div className="card right-card">
            <h2>오늘 날씨 정보</h2>
            <hr className="line" />
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

            <div className="hover-text">
              <p>
                {typeof temp === "number"
                  ? temp <= 0
                    ? "🧣 오늘은 정말 추워요! 따뜻하게 입고 나가세요 🧤"
                    : temp < 15
                    ? "🧥 오늘은 조금 쌀쌀해요! 겉옷 챙기는 건 어때요?"
                    : temp < 25
                    ? "🍃 선선한 날씨예요! 산책하기 좋은 날씨예요 😊"
                    : temp < 30
                    ? "☀️ 따뜻한 날씨예요! 가볍게 입고 나가도 좋아요 😄"
                    : "🕶️ 무더운 날씨! 시원하게 입고 나가세요 🥤"
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
          <div className="slider-buttons">
            <button
              type="button"
              className="slider-btn left-btn"
              onClick={(e) => {
                e.preventDefault();
                setSliderValue((v) => Math.max(v - 25, 0));
              }}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              type="button"
              className="slider-btn right-btn"
              onClick={(e) => {
                e.preventDefault();
                setSliderValue((v) => Math.min(v + 25, 100));
              }}
            >
              <FaLongArrowAltRight />
            </button>
          </div>
          <p
            className="slider-label"
            style={{
              left: `calc(${sliderValue}% -12px)`,
              color: getGrandientColor(sliderValue),
            }}
          >
            슬라이더를 움직여 옷의 두께를 조절하세요
          </p>
          <p
            className="slider-label button-label"
            style={{
              left: `calc(${sliderValue}% -12px)`,
              color: getGrandientColor(sliderValue),
            }}
          >
            버튼을 눌러 옷의 두께를 조절하세요
          </p>
        </div>
      </div>
    </div>
  );
}
