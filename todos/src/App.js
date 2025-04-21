import todos from "./todos";
import TodoList from "./TodoList";

export default function App() {
  const setDone = key => { //стрелочная функция
    const deed = todos.find(current => current.key === key);
    if (deed)
      deed.done = true;
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
        <TodoList list={todos} setDone={setDone}/>
      </main>
    </div>
  )
}