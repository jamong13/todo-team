import { TbShirt } from "react-icons/tb";
import useWeather from "../hooks/useWeather";
import { ThermometerSun } from "lucide-react";
import { convertCondition } from "../utils/formatter";
import "./ToWearSection.css";

export default function ToWearSection() {
  const { temp, weatherCondition } = useWeather();

  const getClothes = () => {
    if (typeof temp !== "number") return "옷차림 정보를 불러오는 중...";

    if (temp <= 0) return "🧥 따뜻한 외투 + 목도리!";
    if (temp <= 15) return "🧥 코트나 자켓!";
    if (temp <= 25) return "👕 얇은 옷과 가벼운 겉옷!";
    if (temp <= 29) return "👚 가벼운 옷차림!";
    return "🩳 최대한 시원하게 입으세요!";
  };

  return (
    <section>
      <div className="towear-header">
        <div className="towear-icon">
          <TbShirt size={24} color="white" />
        </div>
        <h2>오늘 뭐 입지?</h2>
      </div>

      <div className="towear-container">
        {/* --- 왼쪽 카드 --- */}
        <div className="towear-leftcard">
          <p className="card-title">날씨</p>
          <hr className="towear-line" />
          <p>
            <ThermometerSun size={15} />{" "}
            {temp !== null ? `${temp}°C` : "날씨 불러오는 중..."}
            {"  "}
            {convertCondition(weatherCondition)}{" "}
          </p>
          <p className="today-weather">
            {typeof temp === "number"
              ? temp <= 0
                ? "추운 날씨"
                : temp <= 15
                ? "쌀쌀한 날씨"
                : temp <= 25
                ? "적당한 날씨"
                : temp <= 29
                ? "따뜻한 날씨"
                : "무더운 날씨"
              : "오늘은 어떤 날씨일까요?"}
          </p>
        </div>

        {/* --- 오른쪽 카드 --- */}
        <div className="towear-rightcard">
          <p className="card-title">추천 옷차림</p>
          <hr className="towear-line" />
          <div className="clothes">
            <p>{getClothes()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
