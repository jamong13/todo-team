import React, { useState } from "react";
import "./ToEatSection.css"; // CSS 파일을 불러옵니다.

const FOOD_CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "패스트푸드",
  "분식",
  "동남아 요리",
  "디저트",
];

// 랜덤 추천 결과를 계산하는 함수 (컴포넌트 외부에서 한 번만 실행되도록)
const getRecommendation = () => {
  console.log("랜덤 추천 결과 계산 중...");
  const randomIndex = Math.floor(Math.random() * FOOD_CATEGORIES.length);
  return FOOD_CATEGORIES[randomIndex];
};

export default function ToEatSection() {
  const [recommendation, setRecommendation] = useState(getRecommendation);

  const handleRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newRecommendation = getRecommendation();
    setRecommendation(newRecommendation);
  };

  return (
    <div className="toeatsection-container">
      <h2 className="recommender-title subtitle">오늘 뭐 먹지?</h2>
      <div className="recommender-container">
        {/* 랜덤 추천 결과 출력 */}
        <div className="recommendation-output">
          <span className="label">추천 메뉴:</span>
          {/* State를 사용하지 않고 바로 계산된 값을 사용합니다. */}
          <span className="food-result">{recommendation}</span>
        </div>
        <button onClick={handleRefresh} className="f5-button" type="button">
          다른 메뉴 추천 받기
        </button>
      </div>
    </div>
  );
}
