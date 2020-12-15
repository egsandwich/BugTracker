import React, { useRef, useState, useEffect } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Typography, Button, Input, Box } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


function EditModal() {
    const email = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const password = useRef();
    const currPassword = useRef();
    const confPassword = useRef();
    const [status, setStatus] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const history = useHistory()
    const { currentUser, editEmail, editDisplayName, editPassword, reauthenticate } = useAuth()


    async function handleEdit() {
        try {
            setLoading(true)
            //=== ''
            if (email.current.value !== '') {
                console.log("on email")
                await editEmail(email.current.value)
            }
            if (firstName.current.value !== '') {
                var name = currentUser.displayName.toString().split(" ")
                await editDisplayName(firstName.current.value, name[name.length - 1])

            }
            if (lastName.current.value !== '') {
                var name = currentUser.displayName.toString().split(" ")
                await editDisplayName(name[0], lastName.current.value)
            }

        } catch {
            setError("Please try again.")

        }
        history.push('/myProfile')
        setLoading(false)
    }

    return (
        <Box m={3}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Edit</Typography>
                </Grid>
                <Grid item>
                    {error &&
                        <Alert severity="error">
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    }
                    {currentUser.displayName}
                </Grid>
                {/* <form> */}
                <Grid item xs={12}>
                    <Input placeholder="First name" inputRef={firstName} />
                </Grid>

                <Grid item xs={12}>
                    <Input placeholder="Last name" inputRef={lastName} />
                </Grid>

                <Grid item xs={12}>
                    <Input placeholder="Email address" type="email" inputRef={email} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => {
                        setStatus(!status)
                    }}>
                        Change Password
                        </Button>
                    <ReauthenticateCred state={status} />
                </Grid>
                {/* </form> */}
                <Button variant="contained" color="primary" onClick={() => { handleEdit() }} type="submit" disabled={loading}>Save</Button>
            </Grid>
        </Box>
    )


    function ReauthenticateCred(props) {
        const [open, setOpen] = useState(props.state)
        const [loadingP, setLoadingP] = useState(false)
        const [confirmed, setConfirmed] = useState(false)



        async function reauth() {
            try {
                await reauthenticate(currPassword.current.value)
                setConfirmed(true)
                setDone(true)
            } catch {
                alert("Please type your current password again.")

            }
        }

        // async function handleChangePassword() {
        //     setLoadingP(true)

        //     try {
        //         if (password.current.value === '') {
        //             alert("Cannot accept an empty password")
        //         }
        //         if (password.current.value === confPassword.current.value) {
        //             console.log(password.current.value)
        //             await editPassword(password.current.value)
        //             console.log("Changed")
        //         }
        //     } catch {
        //         alert("Passwords do not match")
        //     }
        //     setConfirmed(false) setDone(false)
        //     setLoadingP(false)

        // }

        function handleChangePassword() {

        }

        return open ? (
            <Box>
                <Box>
                    <Input disabled={done} inputRef={currPassword} type="password" placeholder="current password" />
                    <Button variant="contained" disabled={done} onClick={() => {
                        reauth()
                    }}>confirm</Button>
                </Box>
                {done &&
                    <Box>
                        <Input inputRef={password} type="password" placeholder="new password" />
                        <Input inputRef={confPassword} type="password" placeholder="confirm new password" />
                        <Button variant="contained" disabled={loadingP} onClick={() => {
                            handleChangePassword()
                        }}>Change</Button>
                    </Box>

                }

            </Box>
        ) : <></>

    }
}
export default EditModal;



// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../contexts/AuthContext'

// function EditModal(props) {
//     //change to useRef?
//     const [email, setEmail] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false)
//     const { currentUser, editEmail, editDisplayName } = useAuth()

//     //useEffect for useRef?

//     async function handleEdit() {
//         //set loading to true
//         //check if null before updating
//         //history.push to myprofile
//         //set loading to false

//     }

//     return props.state ? (
//         <div>
//             {/* <form> */}
//             <p> <label>First Name:</label> </p>
//             <p> <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />  </p>
//             <p> <label>Last Name:</label> </p>
//             <p> <input value={lastName} onChange={(event) => setLastName(event.target.value)} />  </p>
//             <p> <label>Email:</label> </p>
//             <p> <input value={email} onChange={(event) => setEmail(event.target.value)} />  </p>
//             <p> <label>Password:</label> </p>
//             <p> <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />  </p>
//             <p><button type="submit">Submit</button></p>
//             {/* </form> */}

//         </div>
//     ) : <div></div>
// }


// export default EditModal
