import React, { useState, useCallback } from 'react'
import base from './firebase'
import { withRouter } from 'react-router-dom'


function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [persons, setPersons] = useState([{
    //     name: "name1",
    //     email: "email@email.com",
    // },]);

    const onRegister = useCallback(async event => {
        event.preventDefault();
        try {
            await base
                .auth()
                .createUserWithEmailAndPassword(email, password)
            props.history.push('/login')

        } catch (error) {
            alert(error);
        }

    })


    return (
        <div>
            <form>
                <p> <label>Email:</label> </p>
                <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
                <p> <label>Password:</label> </p>
                <p> <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                <p><button type="submit" onClick={onRegister}>Sign up</button></p>
            </form>

        </div>
    )
}

export default withRouter(Signup)
