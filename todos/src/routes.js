import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';

import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './todoDetail';

import {getTodos, getTodo, addTodo, actTodo } from './api';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos} />
            <Route path=':key' element={<TodoDetail />} loader={getTodo} action={actTodo} />
            <Route path='add' element={<TodoAdd />} action={addTodo} />
        </Route>
    )
);

export default router;
