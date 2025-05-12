import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';

import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';

import todos from './todos';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList list={todos}/>}/>
            <Route path='add' element={<TodoAdd />} />
        </Route>
    )
);

export default router;
