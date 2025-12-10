// utils/formatter.js

export const formatAirQuality = (aqi) =>
  ["좋음", "보통", "약간 나쁨", "나쁨", "매우 나쁨"][aqi - 1] || "-";

export const formatUVIndex = (uv) =>
  uv < 3
    ? "낮음"
    : uv < 6
    ? "보통"
    : uv < 8
    ? "높음"
    : uv < 11
    ? "매우 높음"
    : "위험";

export const formatLocationByWidth = (doc, width) => {
  if (!doc) return "위치 불러오는 중...";
  let locationString = doc.region_1depth_name;

  if (width > 1194) {
    locationString += ` ${doc.region_2depth_name || ""} ${
      doc.region_3depth_name || ""
    }`;
  } else if (width > 874) {
    locationString += ` ${doc.region_2depth_name || ""}`;
  } else if (width > 378) {
    locationString += ` ${doc.region_2depth_name || ""} ${
      doc.region_3depth_name || ""
    }`;
  } else if (width > 303) {
    locationString += ` ${doc.region_2depth_name || ""}`;
  }

  return locationString.trim();
};

export const convertCondition = (c) => {
  switch (c) {
    case "Clear":
      return "맑음 ☀️";
    case "Clouds":
      return "흐림 ☁️";
    case "Rain":
      return "비 🌧️";
    case "Drizzle":
      return "이슬비 🌦️";
    case "Thunderstorm":
      return "천둥번개 ⛈️";
    case "Snow":
      return "눈 ❄️";
    case "Mist":
    case "Fog":
    case "Haze":
      return "안개 🌫️";
    default:
      return "";
  }
};
