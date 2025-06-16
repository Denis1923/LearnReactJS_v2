import { redirect } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './firebase.js'

import todos from './todos';
import { act } from 'react';

const auth = getAuth(firebaseApp);

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

    if (!todo)
        throw new Error();

    if (request.method === 'PATCH')
        todos[todo].done = true;
    else
        todos.splice(todo, 1);

    return redirect('/');
}

export async function register({request}){
    const fd = await request.formData();
    try {
        const oUC = await createUserWithEmailAndPassword(
            auth,
            fd.get('email'), fd.get('password')
        );
        return redirect('/');
    }
    catch(err) {
        return err.code;
    }
}

export function setStateChangeHandler(func) {
    return onAuthStateChanged(auth, func);
}