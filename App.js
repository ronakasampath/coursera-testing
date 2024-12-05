import React, { useState, useEffect } from "react";
import "./App.css"; // We'll style our app in a CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load saved todos from localStorage when the app starts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever 'todos' changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Function to add a new to-do item
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue(""); // Clear the input after adding
    }
  };

  // Function to handle key press in the input box
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo(); // Call addTodo function if Enter is pressed
    }
  };

  // Function to delete a specific to-do item
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Function to delete all todos
  const deleteAllTodos = () => {
    setTodos([]); // Clear the todos
    localStorage.removeItem("todos"); // Clear todos from localStorage as well
  };

  return (
    <div className="app-container">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress} // Add this line to listen for key presses
          placeholder="Type here to add a todo"
          className="input-box"
        />
        <button onClick={addTodo} className="submit-button">Submit</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <div className="todo-text">{todo}</div>
            <button onClick={() => deleteTodo(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <button onClick={deleteAllTodos} className="delete-all-button">
          Delete All
        </button>
      )}
    </div>
  );
}

export default App;



