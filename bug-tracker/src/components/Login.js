import React, { useRef, useState} from "react";
import {useHistory } from 'react-router-dom'
import { Grid, Typography, Button, Input, Box} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import {useAuth} from '../contexts/AuthContext'

function Login(props) {
    const email = useRef()
    const password = useRef()
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const history = useHistory()


    async function handleLogin(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(email.current.value, password.current.value)
            history.push('/')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }


    return (
        <div>
            <Box m={2}>
            <Grid container justify="center" spacing={3}>
                <Grid container item justify="space-between">
                <Grid item xl={6} xs={6}>
                    <Typography variant="h4">Log In</Typography>
                </Grid>
                <Grid item> 
                {error && 
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
                }
                </Grid>
                </Grid>
                <Box m={1}>
                    <form onSubmit={handleLogin}>
                        <Grid item xs={12}>
                        <Input placeholder="Email" inputRef={email} />  
                        </Grid>
                        <Grid item>
                        <Input placeholder="Password" type="password" inputRef={password}/> 
                        </Grid>
                        <Button variant="contained" color="primary" disabled={email.length === 0 || password.length === 0 || loading}type="submit">Login</Button>
                        <Grid item xs={12}>
                            Need an account? Sign up.
                        </Grid>
                    </form>
                </Box>
            </Grid>
            </Box>
        </div >
    );
}
export default Login;