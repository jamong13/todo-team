import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ToDo from "./components/Todo";
import ToWear from "./components/ToWear";
import ToEat from "./components/ToEat";
import ToWatch from "./components/ToWatch";
import "./App.css";

export default function App() {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ToWear />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/towear" element={<ToWear />} />
          <Route path="/toeat" element={<ToEat />} />
          <Route path="/towatch" element={<ToWatch />} />
        </Routes>
      </main>
    </div>
  );
}
