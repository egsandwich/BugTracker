import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from './Auth'
import base from './firebase'
import Modal from './Modal'

function Profile() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { currentUser } = useContext(AuthContext)

    // console.log(currentUser.email)
    useEffect(() => {
        setName(currentUser.displayName)
        setEmail(currentUser.email)
    }, [])

    const showMod = () => {
        setShowModal(!showModal);
        console.log(showModal);
    }

    return (
        <div>
            <p><label>Name</label></p>
            <p>{name}</p>
            <p><label>Email</label></p>
            <p>{email}</p>
            <p><button onClick={showMod}>Edit</button></p>
            <Modal state={showModal} user={currentUser} />
        </div>
    )
}

export default Profile
