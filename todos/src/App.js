import { useState } from 'react';
import initialTodos from './todos.js';
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  
  const setDone = key => { //стрелочная функция
    const newTodos = [...todos]; //что такое ...?
    const deed = newTodos.find(current => current.key === key);
    if (deed)
      deed.done = true;
    setTodos(newTodos);
  };

  const del = key => {
    const newTodos = todos.filter(current => current.key !== key);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <span className="navbar-item is-uppercase">
            Todos
          </span>
        </div>
      </nav>
      <main className="context px-6 py-6">
        <TodoList list={todos} setDone={setDone} del={del}/>
      </main>
    </div>
  )
}