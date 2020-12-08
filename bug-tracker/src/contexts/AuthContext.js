import React, { useContext, useEffect, useState } from 'react'
import base from '../firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return base.auth().createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return base.auth().signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return base.auth().signOut()
    }

    useEffect(()=> {
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
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}