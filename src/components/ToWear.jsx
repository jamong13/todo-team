import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 아이콘
import { MapPinned, ThermometerSun } from "lucide-react";
import { IoWaterSharp, IoSunnyOutline } from "react-icons/io5";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { FiWind } from "react-icons/fi";

// 커스텀 훅 & 유틸
import useWeather from "../hooks/useWeather";
import { formatLocationByWidth } from "../utils/formatter";
import { tempToSlider } from "../utils/tempSlider";
import { clothingOptions } from "../data/clothingOptions";
import { getClothingIndex } from "../utils/clothingIndex";
import { getGradientColor } from "../utils/gradientColor";

// 스타일
import "./ToWear.css";

export default function ToWear() {
  const navigate = useNavigate();

  const { temp, airQuality, uvIndex, humidity, locationDoc } = useWeather();

  const [sliderValue, setSliderValue] = useState(50);
  const [location, setLocation] = useState("위치 불러오는 중...");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 창 크기 감지
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 위치 업데이트
  useEffect(() => {
    if (locationDoc) {
      setLocation(formatLocationByWidth(locationDoc, windowWidth));
    }
  }, [locationDoc, windowWidth]);

  // 온도 기반 초기 슬라이더 값 설정
  useEffect(() => {
    if (typeof temp === "number") {
      setSliderValue(tempToSlider(temp));
    }
  }, [temp]);

  // 현재 선택된 옷 옵션
  const currentClothes = clothingOptions[getClothingIndex(sliderValue)];

  return (
    <div className="towearwrapper">
      <div className="containertowear">
        {/* 헤더 */}
        <div className="app-header">
          <h1 className="title">오늘의 옷 추천</h1>
          <div className="right-space"></div>
        </div>

        {/* 날씨 카드 */}
        <div className="weather-wrapper">
          <div className="card temp-card">
            <h3>
              <MapPinned /> {location}
            </h3>

            <h3>
              <ThermometerSun />{" "}
              {temp !== null ? `${temp}°C` : "날씨 불러오는 중..."}
            </h3>

            <h3>
              {typeof temp === "number"
                ? temp <= 0
                  ? "☃ 추운 날씨"
                  : temp <= 15
                  ? "❄ 쌀쌀한 날씨"
                  : temp <= 25
                  ? "🙂 적당한 날씨"
                  : temp <= 29
                  ? "😎 따뜻한 날씨"
                  : "🥵 무더운 날씨"
                : "❓"}
            </h3>
          </div>

          {/* 오른쪽 날씨 정보 카드 */}
          <div className="card right-card">
            <h2>오늘 날씨 정보</h2>
            <hr className="line" />
            <ul className="weather-info">
              <li>
                <p>
                  <FiWind /> 미세먼지 : {airQuality ?? "불러오는 중..."}
                </p>
              </li>

              <li>
                <p>
                  <IoSunnyOutline style={{ color: "orange" }} /> 자외선 지수 :{" "}
                  {uvIndex ?? "불러오는 중..."}
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

        {/* 설명 */}
        <div className="clothes-description">
          <h2>{currentClothes.description}</h2>
        </div>

        {/* 옷 카드 */}
        <div className="clothes-cards">
          {currentClothes.items.slice(0, 5).map((item, idx) => (
            <div className="card clothes-card" key={idx}>
              <img src={item.image} alt={item.name} className="clothes-image" />
              <p className="card-name">{item.name}</p>
            </div>
          ))}
        </div>

        {/* 슬라이더 */}
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
              left: `calc(${sliderValue}% - 12px)`,
              color: getGradientColor(sliderValue),
            }}
          >
            슬라이더를 움직여 옷의 두께를 조절하세요
          </p>

          <p
            className="slider-label button-label"
            style={{
              left: `calc(${sliderValue}% - 12px)`,
              color: getGradientColor(sliderValue),
            }}
          >
            버튼을 눌러 옷의 두께를 조절하세요
          </p>
        </div>
      </div>
    </div>
  );
}
