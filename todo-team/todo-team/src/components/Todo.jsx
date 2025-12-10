import React, {
  useReducer,
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import "./Todo.css";
import TodoInput from "./TodoContent/TodoInput";
import TodoSearch from "./TodoContent/TodoSearch";
import TodoList from "./TodoContent/TodoList";
import { mockTodo } from "./TodoContent/mockTodo.js";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    case "EDIT":
      return state.map((it) =>
        it.id === action.targetId
          ? { ...it, content: action.content, date: action.date }
          : it
      );
    default:
      return state;
  }
}

export default function Todo() {
  const stored = JSON.parse(localStorage.getItem("todoList")) || mockTodo;
  const [todo, dispatch] = useReducer(reducer, stored);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todo));
  }, [todo]);

  const idRef = useRef(4);

  const [searchDate, setSearchDate] = useState("");

  const onCreate = (content, date) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        date,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  const onEdit = (id, content, date) => {
    dispatch({
      type: "EDIT",
      targetId: id,
      content,
      date,
    });
  };

  const filteredTodo = useMemo(() => {
    return searchDate ? todo.filter((it) => it.date === searchDate) : todo;
  }, [todo, searchDate]);

  const { total, done } = useMemo(() => {
    const total = filteredTodo.length;
    const done = filteredTodo.filter((it) => it.isDone).length;
    return { total, done };
  }, [filteredTodo]);

  return (
    <div className="todo">
      <div className="container todo-container">
        <h1 className="title">오늘 뭐 하지?</h1>

        <div className="clock-box">
          <p>
            <span>
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </span>
            <span>{new Date().toLocaleTimeString("ko-KR")}</span>
          </p>
        </div>

        <TodoInput onCreate={onCreate} />

        <div className="todo-filter-row">
          <TodoSearch searchDate={searchDate} onChange={setSearchDate} />
          <div className="todo-progress">
            완료된 할 일 : {done} / 총 할 일 : {total}
          </div>
        </div>

        <TodoList
          todo={filteredTodo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
