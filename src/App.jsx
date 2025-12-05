import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ToWear from "./components/ToWear";
import Todo from "./components/Todo";
import ToEat from "./components/ToEat";
import ToWatch from "./components/ToWatch";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="container" style={{ padding: "40px 20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="menu-wrapper">
                <h1
                  className="title"
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  무엇을 도와드릴까요?
                </h1>
                <p
                  className="subtext"
                  style={{ textAlign: "center", marginBottom: "40px" }}
                >
                  필요한 메뉴를 선택하세요
                </p>

                <div className="menu-grid">
                  <MenuCard to="/towear" emoji="👕" title="옷 추천" />
                  <MenuCard to="/todo" emoji="📝" title="할 일 관리" />
                  <MenuCard to="/toeat" emoji="🍔" title="뭐 먹지?" />
                  <MenuCard to="/towatch" emoji="🎬" title="영화 추천" />
                </div>
              </div>
            }
          />

          <Route path="/towear" element={<ToWear />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/toeat" element={<ToEat />} />
          <Route path="/towatch" element={<ToWatch />} />
        </Routes>
      </div>
    </Router>
  );
}

function MenuCard({ to, emoji, title }) {
  return (
    <Link to={to} className="menu-card">
      <div className="menu-card-inner">
        <span className="menu-emoji">{emoji}</span>
        <span className="subtitle">{title}</span>
      </div>
    </Link>
  );
}
