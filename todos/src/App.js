import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { setStateChangeHandler } from './api';

export default function App() {
  const [showMenu, setShowMenu] = useState(false);// что значит [showMenu, setShowMenu] ?
  const [user, setUser] = useState(); 

  const authStateChange = __user => {
    setUser(__user);
  };

  const handleBurgerClick = evt => {
    evt.preventDefault();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    const unsubscribe = setStateChangeHandler(authStateChange);
    return () => {unsubscribe()};
  }, []);

  return (
    <div className="container">
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <NavLink 
            to="/"
            className={({ isActive }) =>
              'navbar-item is-uppercase' +
              (isActive ? ' is-active' : '')
            }>
            {!!user ? user.email : 'Todos'}
          </NavLink>
          <a href='/'
            className={ showMenu ? 'navbar-burger is-active' : 'navbar-burger' }
            onClick={handleBurgerClick}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
        </div>
        <div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'}
          onClick={handleBurgerClick} >
         <div className='navbar-start'>
         {!!user && (
            <NavLink
              to="/add"
              className={({ isActive }) =>
                'navbar-item' +
                (isActive ? ' is-active' : '')
              }>
              Создать дело
            </NavLink>
          )
         } 
         { !user && (
            <NavLink to='/register'
              className={({isActive}) => 
                'navbar-item' + (isActive ? 'is-active' : '')}>
                  Зарегистрироваться
                </NavLink>
          )
         }         
         </div> 
        </div>
      </nav>
      <main className="context px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}