import React from "react";
import { useState, useEffect } from "react";
import ToWearSection from "./ToWearSection";
import ToEatSection from "./ToEatSection";
import ToWatchSection from "./ToWatchSection";
import TodoSection from "./TodoSection";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home({ todoList }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `오후 ${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="app">
      {/* Main Content */}
      <main className="container main-content">
        {/* Title */}
        <div className="page-title">
          <h1>오늘의 모든 것</h1>
        </div>

        {/* Date and Time Display */}
        <div className="datetime-box">
          <p>
            {formatDate(currentTime)} {formatTime(currentTime)}
          </p>
        </div>

        {/* Sections Layout */}
        <div className="sections-layout">
          <div className="left-column">
            <Link to="/todo">
              <div className="card todo-section">
                <TodoSection todoList={todoList} />
              </div>
            </Link>
            <Link to="/towatch">
              <div className="card towatch-section">
                <ToWatchSection />
              </div>
            </Link>
          </div>

          <div className="right-column">
            <Link to="/towear">
              <div className="card towear-section">
                <ToWearSection />
              </div>
            </Link>
            <Link to="/toeat">
              <div className="card toeat-section">
                <ToEatSection />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
