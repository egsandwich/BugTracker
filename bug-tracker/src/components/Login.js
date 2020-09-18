import React, { useState, useCallback } from "react";
import { Link, withRouter } from 'react-router-dom'
import firebase from './firebase'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        props.history.push('/');
    }

    // const login = useCallback(
    //     async event => {
    //         event.preventDefault();
    //         try {
    //             await firebase.login(email, password)
    //             console.log(email)
    //             history.push('/')
    //         } catch (error) {
    //             alert(error.message)
    //         }
    //     },
    //     [history],
    // );


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <p> <label>Email:</label> </p>
                <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
                <p> <label>Password:</label> </p>
                <p> <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                <p><button type="submit">Login</button></p>
            </form>
        </div >
    );
}

export default withRouter(Login);