import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';

import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './todoDetail';
import Error404 from './Error404';
import Register from './Register';
import Login from './Login';

import {getTodos, getTodo, addTodo, actTodo, 
        register, login, logout, onlyLoggedOut } from './api';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos} />
            <Route path=':key' element={<TodoDetail />} loader={getTodo} action={actTodo} errorElement={<Error404 />} />
            <Route path='add' element={<TodoAdd />} action={addTodo} />
            <Route path='register' element={<Register/>} action={register} loader={onlyLoggedOut} />
            <Route path='login' element={<Login />} action={login} loader={onlyLoggedOut}  />
            <Route path='logout' loader={logout} />
        </Route>
    )
);

export default router;
