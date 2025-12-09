import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ToWatchSection.css";

const API_KEY = "15e2a5f942912e28e8c5d6b8e9d1c9ce";
const BASE_URL = "https://api.themoviedb.org/3";

export default function ToWatchSection() {
  const [movie, setMovie] = useState(null);

  // 랜덤 영화 불러오기
  async function fetchRandomMovie() {
    try {
      const page = Math.floor(Math.random() * 20 + 1);
      const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}`;
      const res = await axios.get(url);
      const randomMovie =
        res.data.results[Math.floor(Math.random() * res.data.results.length)];
      setMovie(randomMovie);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    }
  }

  // 첫 렌더 시 한 번 실행
  useEffect(() => {
    fetchRandomMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // fetchRandomMovie 밑줄 제거용 주석
  }, []);

  return (
    <section id="towatch-section" className="towatch-section">
      <h2 className="section-title">오늘 뭐 보지?</h2>

      {movie ? (
        <div className="movie-display">
          <div className="poster-wrap">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={movie.title}
              className="poster"
            />
          </div>

          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="rating">⭐ {movie.vote_average.toFixed(1)} / 10</p>
            <p className="overview">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
            <button
              className="reload-btn"
              onClick={(e) => {
                e.preventDefault(); // 혹시 폼 동작 있을 때 대비
                e.stopPropagation(); // 상위 클릭 이벤트(링크 이동) 완전 차단
                fetchRandomMovie(); // 영화만 다시 랜덤으로 불러오기
              }}
            >
              🔄 다른 영화 보기
            </button>
          </div>
        </div>
      ) : (
        <p>영화를 불러오는 중...</p>
      )}
    </section>
  );
}
