export default function getTodayTodo(todoList) {
  const today = new Date().toISOString().slice(0, 10);
  return todoList.filter((it) => it.date === today && !it.isDone);
}
