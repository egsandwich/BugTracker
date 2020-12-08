import React, { useRef, useState } from 'react'
import base from '../firebase'
import { useHistory, Link} from 'react-router-dom'
import { Grid, Typography, Button, Input, Box} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import {useAuth} from '../contexts/AuthContext'


function Signup(props) {
    const email= useRef();
    const firstName = useRef();
    const lastName = useRef();
    const password= useRef();
    const confPassword= useRef();
    const db = base.firestore();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSignup(e){
        e.preventDefault();

        if(password.current.value !== confPassword.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            await signup(email.current.value, password.current.value)
            try {
                db.collection('users').doc(currentUser.uid)
                .set({
                    email: currentUser.email,
                    fName: firstName.current.value,
                    lName: lastName.current.value,
                })
                history.push('/')
            } catch {
                setError('Failed to create an account')
            }
        } catch{
            setError('Failed to create an account')
        }
        setLoading(false)

    }


    function nullChecker(firstName, lastName, email, password){
        return firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0;
    }

    return (
            <Box m={3}>
            <Grid container spacing={3} justify="center">
                <Box maxWidth="400px">
                <Grid item xs={12}>
                    <Typography variant="h4">Sign up</Typography>
                </Grid>
                <Grid item> 
                {error && 
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
                }
                </Grid>
            <form onSubmit={handleSignup}>
                <Grid item xs={12}>
                    <Input placeholder="First name" required="true" inputRef={firstName} />
                </Grid>

                <Grid item xs={12}>
                     <Input placeholder="Last name" required="true" inputRef={lastName} /> 
                </Grid>

                <Grid item xs={12}>
                     <Input placeholder="Email address" required="true" type="email" inputRef={email} /> 
                </Grid>
                
                <Grid item xs={12}>
                    <Input placeholder="Password" required="true" type="password" inputRef={password} /> 
                </Grid>
                
                <Grid item xs={12}>
                    <Input placeholder="Confirm Password" required="true" type="password" inputRef={confPassword}  />
                </Grid>
                <p><Button variant="contained" color="primary" type="submit" disabled={loading}>Sign up</Button></p>
            </form>
                <Grid item xs={12}>
                <Typography variant="subtitle1">  
                Already have an account? <Link to="/login">Log in.</Link>
                </Typography>
                </Grid>
            </Box>
            </Grid>
            </Box>
            
    )
}

export default Signup;
