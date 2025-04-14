import todos from "./todos";

export default function App() {
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
        <h1>Todos</h1>
      </main>
    </div>
  )
}