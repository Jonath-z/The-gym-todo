import { useState } from "react";
import "./App.css";
import TodoCard from "./components/TodoCard";

function App() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  function addToTodos(todo) {
    const newTodos = [...todos, { task: todo, done: false }];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
    setCurrentTodo("");
  }

  function deleteTodo(todo) {
    const newTodos = todos.filter((_todo) => todo.task !== _todo.task);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function achieveTodo(todo) {
    const newTodos = todos.map((_todo) =>
      todo.task === _todo.task ? { ..._todo, done: !_todo.done } : _todo
    );
    console.log({ newTodos });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <div className="w-screen bg-orange-100 h-screen overflow-y-auto">
      <div className="max-w-3xl pt-20 mx-auto px-5">
        <div className="flex gap-3">
          <input
            type="text"
            onChange={(e) => setCurrentTodo(e.target.value)}
            defaultValue={currentTodo}
            value={currentTodo}
            placeholder="New task"
            className="w-full border-gray-300 shadow-xl shadow-orange-200 py-3 px-5 rounded-3xl outline-orange-300"
          />
          <button
            onClick={() => addToTodos(currentTodo)}
            className="bg-orange-600 font-bold hover:bg-orange-700 transition-all text-white w-24 rounded-md"
          >
            Add
          </button>
        </div>

        <div className=" mt-10">
          {todos.map((todo, index) => (
            <TodoCard
              key={index}
              todo={todo}
              deleteTodo={deleteTodo}
              achieveTodo={achieveTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
