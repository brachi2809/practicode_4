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
  const [newTodo, setNewTodo] = useState("");  // מצב של הכניסות מהמשתמש
  const [todos, setTodos] = useState([]);      // רשימת המשימות

  // פונקציה שמביאה את כל המשימות
  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  // פונקציה ליצירת משימה חדשה
  async function createTodo(e) {
    e.preventDefault();  // מונע את שליחת הטופס
    await service.addTask(newTodo);
    setNewTodo("");      // מאפס את הקלט
    await getTodos();    // טוען מחדש את המשימות כדי להציג את החדשה
  }

  // פונקציה לעדכון סטטוס של משימה (הושלמה או לא)
  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();  // טוען מחדש את המשימות
  }

  // פונקציה למחיקת משימה
  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();  // טוען מחדש את המשימות
  }

  useEffect(() => {
    getTodos();  // מקבל את כל המשימות עם העלאת האפליקציה
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
            onChange={(e) => setNewTodo(e.target.value)}  // עדכון ערך ה-input
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => (
            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.isComplete === 1}  // תיקון להתאמת הסטטוס של ה-checkbox
                  onChange={(e) => updateCompleted(todo, e.target.checked)}
                />
                <label>{todo.name}</label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;
