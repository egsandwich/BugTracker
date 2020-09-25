import React, { useEffect, useState } from 'react'
import base from './firebase'

export const AuthContext = React.createContext();


//store authentication status
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true); // we dont know if were logged in

    useEffect(() => {

        base.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>

    );
    ;
}
