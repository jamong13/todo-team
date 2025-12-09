import getTodayTodo from "../components/TodoContent/getTodayTodo.js";
import "./todoSection.css";

export default function TodoSection() {
  const stored = JSON.parse(localStorage.getItem("todoList")) || [];
  const todayTodo = getTodayTodo(stored);

  const onUpdate = (targetId) => {
    const updated = stored.map((it) =>
      it.id === targetId ? { ...it, isDone: !it.isDone } : it
    );
    localStorage.setItem("todoList", JSON.stringify(updated));
    window.location.reload();
  };
  return (
    <div className="home-todo-section">
      <h3 className="home-todo-title">오늘 뭐 하지?</h3>
      {todayTodo.length === 0 ? (
        <p className="empty-msg">오늘 할 일이 없습니다</p>
      ) : (
        todayTodo.map((item) => (
          <div
            className={`todo-card ${item.isDone ? "done" : ""}`}
            key={item.id}
          >
            <label
              className="checkbox-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => onUpdate(item.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="custom-checkbox"></span>
            </label>

            <span className={`todo-text ${item.isDone ? "done" : ""}`}>
              {item.content}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
