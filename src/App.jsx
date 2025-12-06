import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Todo from "./components/Todo";
import ToWear from "./components/ToWear"
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/towear" element={<ToWear />} />
          
        </Routes>
      </main>
    </div>
  );
}
