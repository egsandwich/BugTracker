import React, { useState, useCallback } from 'react'
import base from './firebase'
import { withRouter } from 'react-router-dom'


function Signup(props) {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const db = base.firestore();

    // const [persons, setPersons] = useState([{
    //     name: "name1",
    //     email: "email@email.com",
    // },]);

    const onRegister = useCallback(async event => {
        event.preventDefault();
        try {
            await base
                .auth()
                .createUserWithEmailAndPassword(email, password).then(function (data) {
                    // console.log(data.user.uid)
                    db.collection('users').add({
                        userId: data.user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    })

                })
            // setUserId(base.auth().getCurrentUser().getUId());

            props.history.push('/login')

        } catch (error) {
            alert(error);
        }

    })


    return (
        <div>
            <form>
                <p> <label>First Name:</label> </p>
                <p> <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />  </p>
                <p> <label>Last Name:</label> </p>
                <p> <input value={lastName} onChange={(event) => setLastName(event.target.value)} />  </p>
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
