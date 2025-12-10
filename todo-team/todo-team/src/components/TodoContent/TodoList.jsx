import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todo, onUpdate, onDelete, onEdit }) {
  if (todo.length === 0) {
    return (
      <div className="todo-list">
        <p className="empty">해당 날짜에 등록된 할 일이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="list-wrapper">
        {todo.map((it) => (
          <TodoItem
            key={it.id}
            id={it.id}
            content={it.content}
            date={it.date}
            isDone={it.isDone}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
