import React, { useState, useCallback } from 'react'
import base from './firebase'
import { withRouter } from 'react-router-dom'


function Signup(props) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
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
                   try{
                    db.collection('users').doc(data.user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    })
                    base.auth().currentUser.updateProfile({
                        displayName: firstName + " " + lastName 
                    }) 
                    props.history.push('/login')
                   } catch(error) {
                        alert("Something went wrong. Please try again.")
                        base.auth().currentUser.delete().then(function () {
                            setEmail(" ");
                            setFirstName(" ");
                            setLastName(" ");
                            setPassword("");
                            
                        })
                   }

                })
            // setUserId(base.auth().getCurrentUser().getUId());


        } catch (error) {
            alert(error);
            props.history.push('/signup');
        }

    })

    function nullChecker(firstName, lastName, email, password){
        return firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0;
    }

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
                <p><button type="submit" disabled={nullChecker(firstName, lastName, email, password)}onClick={onRegister}>Sign up</button></p>
            </form>

        </div>
    )
}

export default withRouter(Signup)
