import React from "react";

export default function TodoSearch({ searchDate, onChange }) {
  return (
    <div className="todo-search">
      <div className="search-wrapper">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => onChange(e.target.value)}
          placeholder="조회 날짜"
        />
        {searchDate && (
          <button className="clear-btn" onClick={() => onChange("")}>
            x
          </button>
        )}
      </div>
    </div>
  );
}
