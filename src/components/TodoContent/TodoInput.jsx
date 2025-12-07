import React, { useState, useRef } from "react";

export default function TodoInput({ onCreate }) {
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!content) {
      inputRef.current?.focus();
      return;
    }
    onCreate(content, date);
    setContent("");
    setDate(today);
  };

  return (
    <div className="todo-input">
      <div className="input-wrapper">
        <div className="row">
          <span className="date-label">추가할 일</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="할일을 입력하세요..."
            value={content}
            onChange={onChangeContent}
            onKeyDown={onKeyDown}
          />
          <span className="date-label">실행 날짜</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={onSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
}
