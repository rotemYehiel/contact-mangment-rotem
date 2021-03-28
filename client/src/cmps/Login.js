import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from '../actions/UserAction';

const Login = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setUserName('');
        setPassword('');
    }

    const login = async (ev) => {
        ev.preventDefault();
        const userCredentials = {
            name: userName,
            password: password
        }
        dispatch(loadUser(userCredentials));
        resetForm();
    }
    return (
        <section className="login-cmp">
            <h2 className="page-header">Log in:</h2>
            <form onSubmit={(ev) => login(ev)}>
                <label>Name: </label>
                <input
                    autoComplete="on"
                    type="text"
                    placeholder="Eter your name"
                    name="userName"
                    value={userName}
                    onChange={(ev) => setUserName(ev.target.value)}
                />
                <label>Password: </label>
                <input
                    autoComplete="on"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button className="buttons" type="submit">Go</button>
            </form>
        </section>
    )
}
export default Login;