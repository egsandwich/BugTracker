import React, { useRef, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
// import EditModal from './EditModal'
import { Typography, Box, Grid, Button } from '@material-ui/core/';
import { useHistory } from 'react-router-dom'


function Profile() {
    const emails = useRef();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const { currentUser, deleteProfile } = useAuth()
    const history = useHistory()

    useEffect(() => {
        setEmail(currentUser.email)
        emails.current = currentUser.email
    }, [currentUser])

    function handleMod() {
        history.push("/updateProfile")
    }

    async function handleDelete() {
        alert("MEEP MORP")
        //set loading to true
        //ask user if theyre sure
        //make them type their password or their email address as confirmation
        //if !confirmed return else
        // delete user from projects
        //await deleteProfile()
        //history.push to sign up
        //set loading to false
    }

    return (
        <Box m={3}>
            <Grid container justify="center">
                <Grid item>
                    <Typography variant="h5">
                        My Profile
                    </Typography>
                    <Typography variant="h6">
                        Email address:
                    </Typography>
                    <Typography variant="subtitle1">
                        {emails.current}
                    </Typography>
                    <Button onClick={() => {
                        handleMod()
                    }} variant="contained">Edit</Button>
                    <Button disabled={loading} onClick={() => {
                        handleDelete()
                    }} variant="contained">Delete</Button>
                </Grid>
            </Grid>
        </Box>
    )
}


export default Profile
