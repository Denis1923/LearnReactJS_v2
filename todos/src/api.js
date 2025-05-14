import { redirect } from 'react-router-dom';

import todos from './todos';

export function getTodos() {
    return todos;
}

export function getTodo({params}) {
    const key = +params.key; // '+' преобразовывает в число
    const todo = todos.find(current => current.key == key); // find ищет по условию элементы
    return todo;
}

export async function addTodo({request}) {
    const fd = await request.formData();
    const date = new Date();
    const newTodo = {
        title: fd.get('title'),
        desc: fd.get('desc'),
        image: fd.get('image'),
        done: false,
        createAt: date.toLocaleString(),
        key: date.getTime()
    };

    todos.push(newTodo);
    return redirect('/');
}

// почему паарметры в {}
export function actTodo({ params, request }) {
    const key = +params.key;
    const todo = todos.findIndex(current => current.key === key);

    if (request.method === 'PATCH')
        todos[todo].done = true;
    else
        todos.splice(todo, 1);

    return redirect('/');
}