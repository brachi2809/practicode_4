import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo(""); // clear input
    await getTodos(); // refresh tasks list (in order to see the new one)
  }

  // async function updateCompleted(todo, isComplete) {
  //   try {
  //     await service.setCompleted(todo.id, isComplete, todo.name); // גם השם
  //     await getTodos(); // רענון רשימת המשימות
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // }
  
  async function updateCompleted(todo, isComplete) {
    try {
      const response = await service.setCompleted(todo.id, isComplete, todo.name);
      
      if (response && response.success) { // נבדוק שהתשובה תקינה
        await getTodos(); // רענון רשימת המשימות
      } else {
        console.error("Failed to update task:", response);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
  
  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); // refresh tasks list
  }

  async function updateTodoName(todo, name) {
    await service.updateTaskName(todo.id, name);
    await getTodos(); // refresh tasks list to reflect name update
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input 
            className="new-todo" 
            placeholder="Well, let's take on the day" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    defaultChecked={todo.isComplete} 
                    onChange={(e) => updateCompleted(todo, e.target.checked)} 
                  />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default App;
