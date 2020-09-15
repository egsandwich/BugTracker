import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom'
import firebase from './firebase'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        try {
            await firebase.login(email, password)
            props.history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <p> <label>Email:</label> </p>
                <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
                <p> <label>Password:</label> </p>
                <p> <input value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                <p><button type="submit" onClick={login}>Login</button></p>
            </form>
        </div >
    );
}

export default Login;