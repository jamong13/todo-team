import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ToEat.css";

const KAKAO_REST_API_KEY = "0838cf7b8fa1fc663d1b9f1d667ee216";
const KAKAO_JS_KEY = "7878d3773ee1aa648837e884de17feab";
const KAKAO_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

export default function ToEat() {
  const [inputLocation, setInputLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const infoWindowInstance = useRef(null);

  // 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!window.kakao || !mapRef.current) return;

      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        };
        mapInstance.current = new window.kakao.maps.Map(container, options);
      });
    };

    const existingScript = document.querySelector("#kakao-map-sdk");

    // 스크립트가 아직 없는 경우: 새로 추가하고 onload에서 initMap 실행
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
      return;
    }

    // 스크립트는 있지만 window.kakao가 아직 준비 전일 수 있으므로 onload 보장
    if (!window.kakao) {
      existingScript.addEventListener("load", initMap);
      return () => {
        existingScript.removeEventListener("load", initMap);
      };
    }

    // 이미 SDK가 로드된 경우 바로 초기화
    initMap();
  }, []);

  const handleAddLocation = () => {
    if (!inputLocation.trim()) {
      setError("지역을 입력해주세요!");
      return;
    }
    setSelectedLocation(inputLocation.trim());
    setRecommendations([]);
    setError("");
    //setInputLocation("");
    // 입력한 지역 값이 사라지지 않음
  };

  const handleRecommend = async (selectedCategory) => {
    if (!selectedLocation) {
      setError("지역을 먼저 추가해주세요!");
      return;
    }
    try {
      setError("");
      setLoading(true);
      // setRecommendations([]);

      const query = `${selectedLocation} ${selectedCategory}`;
      const res = await axios.get(KAKAO_URL, {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
        params: { query, size: 10 },
      });

      const places = res.data.documents;
      if (places.length === 0) {
        setError("검색 결과가 없습니다 😢");
        // setRecommendations([]);
        return;
      }

      setRecommendations(places);
      setInputLocation("");
      // 지역 입력값이 사라짐

      // 첫 번째 결과로 지도 이동
      const first = places[0];
      moveMarker(first);
    } catch (err) {
      console.error(err);
      setError("API 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 마커 이동
  const moveMarker = (place) => {
    if (!mapInstance.current || !window.kakao) return;
    const lat = parseFloat(place.y);
    const lng = parseFloat(place.x);
    if (isNaN(lat) || isNaN(lng)) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    // 지도 중심 이동
    mapInstance.current.setCenter(position);

    // 이전 마커 제거
    if (markerInstance.current) markerInstance.current.setMap(null);
    if (infoWindowInstance.current) infoWindowInstance.current.close();

    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(mapInstance.current);
    markerInstance.current = marker;

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:6px 10px;font-size:14px;font-weight:bold;color:#000;">${place.place_name}</div>`,

      removable: true,
    });
    infowindow.open(mapInstance.current, marker);
    infoWindowInstance.current = infowindow;
  };

  return (
    <div className="ToEat">
      <h1 className="title">🍽️ 오늘 뭐 먹지?</h1>

      <div className="ToEat-container">
        <div>
          <div className="custom-input-wrapper">
            <input
              className="custom-input"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
              placeholder="지역 입력"
              style={{ marginRight: "0.5rem" }}
            />
            <button onClick={handleAddLocation}>추가</button>
          </div>
          <div className="category-buttons-wrapper">
            <button onClick={() => handleRecommend("한식")}>한식</button>
            <button onClick={() => handleRecommend("중식")}>중식</button>
            <button onClick={() => handleRecommend("일식")}>일식</button>
            <button onClick={() => handleRecommend("양식")}>양식</button>
            <button onClick={() => handleRecommend("패스트푸드")}>
              패스트푸드
            </button>
            <button onClick={() => handleRecommend("분식")}>분식</button>
            <button onClick={() => handleRecommend("동남아요리")}>
              동남아 요리
            </button>
            <button onClick={() => handleRecommend("디저트")}>디저트</button>
          </div>
          <ul>
            {/* {loading && (
              <div className="status-message loading">⏳ 검색 중...</div>
            )}
            {error && <div className="status-message error">{error}</div>} */}
            {recommendations.length > 0 ? (
              recommendations.map((place, idx) => (
                <li
                  key={idx}
                  onClick={() => moveMarker(place)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <h2 className="subtitle">{place.place_name}</h2> */}
                  <strong className="place-name">{place.place_name}</strong>
                  <p>{place.road_address_name || place.address_name}</p>
                  {place.phone && <p>📞 {place.phone}</p>}
                </li>
              ))
            ) : (
              <div className="empty-message">
                지역 추가 후 음식 카테고리를 선택하면 이 공간에 맛집을
                보여드릴게요.
              </div>
            )}
            ({" "}
            {loading && (
              <div className="status-message loading">⏳ 검색 중...</div>
            )}
            {error && <div className="status-message error">{error}</div>})
          </ul>
        </div>
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "420px",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor:
              "whiteSmoke" /* 지도가 로드되기 전까지 배경색 설정 */,
          }}
        ></div>
      </div>
    </div>
  );
}
