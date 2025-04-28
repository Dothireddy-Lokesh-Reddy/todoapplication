import React, { useState, useEffect } from "react";
import { CheckCircle, Trash2, Plus, Sun, Moon } from "lucide-react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // Load todos and theme from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedTheme = localStorage.getItem("theme") === "dark";
    setTodos(savedTodos);
    if (savedTheme) document.documentElement.classList.add("dark");
  }, []);

  // Save todos to localStorage on update
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      setTodos([
        { id: Date.now(), text: input.trim(), completed: false },
        ...todos,
      ]);
      setInput("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTodo();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-950 p-4 sm:p-6 transition-colors duration-500">
      <div className="bg-gray-800/80 dark:bg-gray-900/80 shadow-[0_0_15px_rgba(0,255,255,0.3)] rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg transition-all duration-300 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 dark:text-cyan-300 tracking-wider">
            TODO
          </h1>

        </div>

        {/* Input Section */}
        <div className="flex gap-2 sm:gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="New task..."
            className="flex-1 p-3 sm:p-4 rounded-md bg-gray-700/50 dark:bg-gray-800/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-pink-400 text-white text-base sm:text-lg transition-all duration-200 placeholder-gray-400"
          />
          <button
            onClick={handleAddTodo}
            className="bg-cyan-500 dark:bg-pink-500 hover:bg-cyan-600 dark:hover:bg-pink-600 active:scale-95 transition-all duration-200 text-white rounded-md p-3 sm:p-4 shadow-[0_0_10px_rgba(0,255,255,0.5)] dark:shadow-[0_0_10px_rgba(255,105,180,0.5)]"
          >
            <Plus size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Todos List */}
        <ul className="flex flex-col gap-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 text-base sm:text-lg font-mono">
              No tasks. Create one!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 bg-gray-700/30 dark:bg-gray-800/30 hover:bg-gray-700/50 dark:hover:bg-gray-800/50 rounded-md p-3 sm:p-4 transition-all duration-200 group border-l-4 border-cyan-500 dark:border-pink-500"
              >
                <button
                  onClick={() => handleToggleComplete(todo.id)}
                  className={`transition-all duration-200 ${todo.completed
                    ? "text-cyan-400 dark:text-pink-400"
                    : "text-gray-400"
                    }`}
                >
                  <CheckCircle
                    size={20}
                    className="sm:w-5 sm:h-5"
                    fill={todo.completed ? "currentColor" : "none"}
                  />
                </button>
                <span
                  className={`flex-1 text-base sm:text-lg font-mono break-all ${todo.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                    }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 size={18} className="sm:w-5 sm:h-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;