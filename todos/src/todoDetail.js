import { useLoaderData } from 'react-router-dom'; // то что в {} - это хук

// что означает export default 
// что будет если напсиать без default
export default function TodoDetail(){
    const todo = useLoaderData(); // что делает

    // что значит todo.done &&
    return (
        <section>
            {todo.done &&
                <p className='has-text-success'>
                    Выполнено
                </p>
            }
            <h1>{todo.title}</h1>
            <p>{todo.createdAt}</p>
            {todo.desc && <p>{todo.desc}</p>}
            {todo.image && <p><img src={todo.image} alt='Иллюстрация' /></p>}
        </section>
    );
}