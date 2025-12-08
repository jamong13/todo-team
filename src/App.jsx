import Home from "./homepage/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ToEat from "./components/ToEat";
import "./App.css";

export default function App() {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/todo" element={<ToDo />} /> */}
          {/* <Route path="/towear" element={<ToWear />} /> */}
          <Route path="/toeat" element={<ToEat />} />
          {/* <Route path="/towatch" element={<ToWatch />} /> */}
        </Routes>
      </main>
    </div>
  );
}
