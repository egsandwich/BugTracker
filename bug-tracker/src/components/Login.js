import React, { useState, useCallback } from "react";
import { withRouter } from 'react-router-dom'
import base from './firebase'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const login = useCallback(
        async event => {
            event.preventDefault();
            try {
                await base
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                props.history.push('/')
            } catch (error) {
                alert("Something went wrong. Please try again");
                setPassword("");
                props.history.push('/login')

            }
        }
    );


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <p> <label>Email:</label> </p>
                <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
                <p> <label>Password:</label> </p>
                <p> <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                <p><button disabled={email.length === 0 || password.length === 0}type="submit">Login</button></p>
            </form>
        </div >
    );
}

export default withRouter(Login);