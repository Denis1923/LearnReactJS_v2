import { redirect } from 'react-router-dom';
import { 
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged,
    signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from './firebase.js'
import { getDatabase, ref, push, set, query, get, remove } from 'firebase/database';

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

function getUserId(){
    if (auth.currentUser)
        return auth.currentUser.uid;
    else
        return window.localStorage.getItem('user-id');
}

export async function getTodos(user) {
    const currentUserId = getUserId();

    if (!currentUserId)
        return redirect('/login');

    const r = ref(database, `users/${currentUserId}/todos`);
    const q = query(r);
    const s = await get(q);
    const res = [];

    s.forEach((doc) => {
        const __todo = doc.val;
        __todo.key = doc.key;
        res.push(__todo);
    });

    return res;
}

export async function getTodo({params}) {
    const currentUserId = getUserId();

    if (!currentUserId)
        return redirect('/login');

    const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
    const q = query(r);
    const s = await get(q);

    if(!s.exists())
        throw new Error();
    return s.val();
}

export async function addTodo({request}) {
    const currentUserId = getUserId();
    
    if (!currentUserId)
        return redirect('/login');

    const fd = await request.formData();
    const date = new Date();
    const newTodo = {
        title: fd.get('title'),
        desc: fd.get('desc'),
        image: fd.get('image'),
        done: false,
        createAt: date.toLocaleString()
    };

    const db = ref(database, `users/${currentUserId}/todos`);
    const r = await push(db);
    await set(r, newTodo);
    return redirect('/');
}

// почему паарметры в {}
export function actTodo({ params, request }) {
    const currentUserId = getUserId();

    if (!currentUserId)
        return redirect('/login');

    if (request.method === 'PATCH') {
        const r = ref(database, `users/${currentUserId}/todos/${params.key}/done`);
        set(r, true);
    }
    else {
        const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
        remove(r);
    }

    return redirect('/');
}

export async function register({request}){
    const fd = await request.formData();
    try {
        const cr = await createUserWithEmailAndPassword(
            auth,
            fd.get('email'), fd.get('password')
        );
        window.localStorage.setItem('user-id', cr.user.uid);

        return redirect('/');
    }
    catch(err) {
        return err.code;
    }
}

export function setStateChangeHandler(func) {
    return onAuthStateChanged(auth, func);
}

export async function login({request}) {
    const fd = await request.formData();
    try {
        const cr = await signInWithEmailAndPassword(
            auth, fd.get('email'), fd.get('password')
        );
        window.localStorage.setItem('user-id', cr.user.uid);

        return redirect('/');
    } catch (err) {
        return err.code;
    }
}

export async function logout() {
    await signOut(auth);
    window.localStorage.removeItem('user-id');

    return redirect('/');
}

export function onlyLoggedOut() {
     const currentUserId = getUserId();

    if (!currentUserId)
        return redirect('/');
    else
        return null;
}