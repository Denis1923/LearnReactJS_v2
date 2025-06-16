import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';

import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './todoDetail';
import Error404 from './Error404';
import Register from './Register';

import {getTodos, getTodo, addTodo, actTodo, register } from './api';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos} />
            <Route path=':key' element={<TodoDetail />} loader={getTodo} action={actTodo} errorElement={<Error404 />} />
            <Route path='add' element={<TodoAdd />} action={addTodo} />
            <Route path='register' element={<Register/>} action={register} />
        </Route>
    )
);

export default router;
