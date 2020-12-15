import React, { useContext, useEffect, useState } from 'react'
import base from '../firebase'
import firebase from 'firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return base.auth().createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return base.auth().signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return base.auth().signOut()
    }

    function deleteProfile() {
        return currentUser.delete();
    }

    function editEmail(email) {
        return currentUser.updateEmail(email);
    }

    function reauthenticate(password) {
        var cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, password)
        return currentUser.reauthenticateWithCredential(cred);
    }

    function editDisplayName(firstName, lastName) {
        return currentUser.updateProfile({
            displayName: firstName + " " + lastName,
        })

    }

    function editPassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = base.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        deleteProfile,
        editEmail,
        editDisplayName,
        editPassword,
        reauthenticate
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}