import React, { useState, useEffect, useContext } from 'react'
import base from './firebase'
import { AuthContext } from './Auth'

function EditModal(props) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const { currentUser } = useContext(AuthContext)

    const onEdit = () => {
        // base.firestore().collection('users').where("userId", "==", currentUser.uid)
        // .get().then(snapshot => ())
        currentUser.updateEmail(email)
    }

    return props.state ? (
        <div>
            {/* <form> */}
            <p> <label>First Name:</label> </p>
            <p> <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />  </p>
            <p> <label>Last Name:</label> </p>
            <p> <input value={lastName} onChange={(event) => setLastName(event.target.value)} />  </p>
            <p> <label>Email:</label> </p>
            <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
            <p> <label>Password:</label> </p>
            <p> <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
            <p><button onClick={onEdit}>Submit</button></p>
            {/* </form> */}

        </div>
    ) : <div></div>
}


export default EditModal
