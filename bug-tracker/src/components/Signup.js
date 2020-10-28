import React, { useState, useCallback } from 'react'
import base from './firebase'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Paper, Card, Button, Input, Box,FormControl } from '@material-ui/core'



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
            <Box m={2}>
            <Grid container layout='row' spacing={3}>
                <Grid container justify="space-between">
                <Grid item xl={6} xs={6}>
                    <Typography variant="h4">Sign up</Typography>
                </Grid>
                    <Button  variant="contained" href="/login">Log In</Button>
                </Grid>
            <Box m={1}>
            <form>
                <Grid item xs={12}>
                    <p> <Input placeholder="First name" required="true" value={firstName} onChange={(event) => setFirstName(event.target.value)} />  </p>
                </Grid>

                <Grid item xs={12}>
                    <p> <Input placeholder="Last name" required="true" value={lastName} onChange={(event) => setLastName(event.target.value)} />  </p>
                </Grid>

                <Grid item xs={12}>
                    <p> <Input placeholder="Email address" required="true" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
                </Grid>
                
                <Grid item xs={12}>
                    <p> <Input placeholder="Password" required="true" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
                </Grid>
                <p><Button variant="contained" type="submit" >Sign up</Button></p>
            </form>
            </Box>
            </Grid>
            </Box>
        </div>
    )
}

export default withRouter(Signup)
