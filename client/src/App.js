// import React, { useEffect, useState } from 'react';
// import service from './service.js';

// function App() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   async function getTodos() {
//     const todos = await service.getTasks();
//     setTodos(todos);
//   }

//   async function createTodo(e) {
//     e.preventDefault();
//     await service.addTask(newTodo);
//     setNewTodo("");//clear input
//     await getTodos();//refresh tasks list (in order to see the new one)
//   }

//   async function updateCompleted(todo, isComplete) {
//     await service.setCompleted(todo.id, isComplete);
//     await getTodos();//refresh tasks list (in order to see the updated one)
//   }

//   async function deleteTodo(id) {
//     await service.deleteTask(id);
//     await getTodos();//refresh tasks list
//   }

//   useEffect(() => {
//     getTodos();
//   }, []);

//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//         <form onSubmit={createTodo}>
//           <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
//         </form>
//       </header>
//       <section className="main" style={{ display: "block" }}>
//         <ul className="todo-list">
//           {todos.map(todo => {
//             return (
//               <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
//                 <div className="view">
//                   <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
//                   <label>{todo.name}</label>
//                   <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </section >
//   );
// }

// export default App;
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

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos(); // refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); // refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
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
                    checked={todo.isComplete === 1} 
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

      <style>
        {`
          .todoapp {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            padding: 20px;
            margin: 0 auto;
            max-width: 400px;
            border-radius: 8px;
          }

          .header h1 {
            text-align: center;
            color: #333;
          }

          .new-todo {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-top: 10px;
          }

          .main {
            margin-top: 20px;
          }

          .todo-list {
            list-style: none;
            padding-left: 0;
          }

          .todo-list li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
          }

          .todo-list li.completed label {
            text-decoration: line-through;
            color: #bbb;
          }

          .toggle {
            margin-right: 10px;
          }

          .destroy {
            background: transparent;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
          }

          .destroy:hover {
            color: red;
          }
        `}
      </style>
    </section>
  );
}

export default App;
