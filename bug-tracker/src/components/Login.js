import React, { useState, useCallback } from "react";
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Paper, Card, Button, Input, Box,FormControl } from '@material-ui/core'
import base from './firebase'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const login = useCallback(
        async event => {
            event.preventDefault();
            try {
                await base
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                props.history.push('/')
            } catch (error) {
                alert("Something went wrong. Please try again");
                setPassword("");
                props.history.push('/login')

            }
        }
    );


    return (
        <div>
            <Box m={2}>
            <Grid container layout={'row'} spacing={3}>
                <Grid item xl={12} xs={12}>
                    <Typography variant="h4">Log In</Typography>
                </Grid>
                <Box m={1}>
                    <form onSubmit={login}>
                        <Grid item xs={12}>
                        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />  
                        </Grid>
                        <Grid item>
                        <p> <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                        </Grid>
                        <p><Button variant="contained" color="primary" disabled={email.length === 0 || password.length === 0}type="submit">Login</Button></p>
                    </form>
                </Box>
            </Grid>
            </Box>
        </div >
    );
}

export default withRouter(Login);