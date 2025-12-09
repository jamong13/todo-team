import React, { useEffect, useState } from "react";
import "./ToWatch.css";
import axios from "axios";

const API_KEY = "15e2a5f942912e28e8c5d6b8e9d1c9ce";
const BASE_URL = "https://api.themoviedb.org/3";

const genres = [
  { id: 0, name: "전체" },
  { id: 28, name: "액션" },
  { id: 35, name: "코미디" },
  { id: 18, name: "드라마" },
  { id: 27, name: "공포" },
  { id: 10749, name: "로맨스" },
  { id: 53, name: "스릴러" },
  { id: 16, name: "애니메이션" },
];

export default function ToWatch() {
  const [movies, setMovies] = useState([]); //영화 데이터 상태
  const [selectedGenre, setSelectedGenre] = useState(0); //장르 상태
  const [reloadKey, setReloadKey] = useState(0); //같은 장르 클릭 시 다시 로드

  // 모달 관련 상태
  const [selectedMovie, setSelectedMovie] = useState(null); //선택 영화 정보
  const [showModal, setShowModal] = useState(false); //모달 열림

  // 영화 데이터 불러오기
  async function fetchMovies(genreId) {
    try {
      const page = Math.floor(Math.random() * 10 + 1); //랜덤 페이지 번호 (1~10 페이지의 있는 영화를 불러오기 위해)
      // 장르별 API URL 0이면 전체
      const url =
        genreId === 0
          ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}`
          : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreId}&page=${page}`;

      const res = await axios.get(url); //THEMOVIEDB API호출추
      const random6 = res.data.results
        .sort(() => 0.5 - Math.random()) //랜덤 정렬
        .slice(0, 6); //6개 영화
      setMovies(random6); //영화 업데이트(6개)
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    }
  }

  // 장르 변경 or 새로고침 시 영화 다시 로드
  useEffect(() => {
    fetchMovies(selectedGenre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // // fetchMovie가 매 랜더마다 재호출되어 무한루프 생겨 한 번만 실행되면 충분해 검사 제외(밑줄제거)
  }, [selectedGenre, reloadKey]);

  // 장르 버튼 클릭 이벤트
  const handleGenreClick = (genreId) => {
    if (selectedGenre === genreId)
      setReloadKey((prev) => prev + 1); //같은 장르면 새로고침
    else setSelectedGenre(genreId); //다른 장르 선택
  };

  // 영화 클릭 → 모달 오픈
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <section id="towatch">
      <header></header>
      <div className="towatch-container">
        <h1>오늘 뭐 보지?</h1>
        <h2>오늘의 추천영화</h2>

        <div className="genre-buttons">
          {genres.map((g) => (
            <button
              key={g.id}
              className={selectedGenre === g.id ? "active" : ""} //현재 선택된 장르
              onClick={() => handleGenreClick(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)} //클릭 시 모달 열림
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average.toFixed(1)} / 10</p>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 영역 */}
      {showModal && selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={selectedMovie.title}
            />
            <div className="modal-info">
              <h2>{selectedMovie.title}</h2>
              <p className="modal-rating">
                ⭐ {selectedMovie.vote_average.toFixed(1)} / 10
              </p>
              <p className="modal-overview">
                {selectedMovie.overview
                  ? selectedMovie.overview
                  : "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
