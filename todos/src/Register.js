import { useState } from 'react';
import { useFetcher } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const fetcher = useFetcher();

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

    const handleFormSubmit = evt => {
        evt.preventDefault();
        if (validate())
            fetcher.submit({email, password}, {action: '/register', method: 'post'});
    };

    const handleFormReset = () => {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };

    const resetErrorMessage = () => {
        setErrorEmail('');
        setErrorPassword('');
        setErrorPasswordConfirm('');
    };

    if (fetcher.data) {
        resetErrorMessage();
        if (fetcher.data === 'auth/email-already-in-use') {
            setErrorEmail('Посетитель с таким адресом уже зарегистрирован');
        } else if (fetcher.data === 'auth/weak-password') {
            setErrorPassword('Слишком простой пароль');
            setErrorPasswordConfirm('Слишком простой пароль');
        }
        fetcher.data = undefined;
    }

    const validate = () => {
        resetErrorMessage();

        if(!email) {
            setErrorEmail('Адрес электронной почты не указан');
            return false;
        }

        if(!password) {
            setErrorPassword('Пароль не указан');
            return false;
        }

        if(!passwordConfirm) {
            setErrorPasswordConfirm('Повтор пароля не указан');
            return false;
        }

        if (password !== passwordConfirm){         
            setErrorPassword('Введенные пароли не совпадают');
            setErrorPasswordConfirm('Введенные пароли не совпадают');
            return false;
        }

        return true;
    };

    return (
        <section>
            <h1>Регистрация</h1>
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className='field'>
                    <label className='label'>Адрес электронной почты</label>
                    <div className='control'>
                        <input type='email' value={email} className='input'
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    {errorEmail && 
                        <p className='help is=danger'>
                            {errorEmail}
                        </p>
                    }
                </div>
                <div className='field'>
                    <label className='label'>Пароль</label>
                    <div className='control'>
                        <input type='password' value={password} className='input'
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    {errorPassword && 
                        <p className='help is=danger'>
                            {errorPassword}
                        </p>
                    }
                </div>
                <div className='field'>
                    <label className='label'>Повтор пароля</label>
                    <div className='control'>
                        <input type='password' value={passwordConfirm} className='input'
                            onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>
                    {errorPasswordConfirm && 
                        <p className='help is=danger'>
                            {errorPasswordConfirm}
                        </p>
                    }
                </div>
                <div className='field is-grouped is-grouped-right'>
                    <div className='control'>
                        <input type='reset' className='button is-warning is-light'
                            value='Сброс' />
                    </div>
                    <div className='control'>
                        <input type='submit' className='button is-primary'
                            value="Зарегистрироваться" />
                    </div>
                </div>
            </form>
        </section>
    );
}