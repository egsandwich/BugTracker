import React, { useState, useEffect, useContext, useCallback } from "react";
import Preview from "./Preview";
import NavBar from "./NavBar";
import Header from "./Header";
import base from "./firebase";
import { Grid, Typography, Paper, Card, Button, Link as LinkUI, Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import ChartPriority from "./ChartPriority";
import { AuthContext } from "./Auth";

function Dashboard(props) {
    //backend

    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState("");
    const { currentUser } = useContext(AuthContext)

    const handleUpdate = useCallback(
        async event => {
            event.preventDefault();
            try {
                await currentUser.updateProfile({
                    displayName: username
                })
                props.history.push('/')
            } catch (error) {
                alert(error);
            }
        }
    );

    const logout = () => {
        base.auth().signOut().then(
            props.history.push('/login')
        )
    }
    // console.log(firebase.getCurrentUsername())
    // if (!firebase.getCurrentUsername()) {
    //     alert('Please login first')
    //     props.history.replace('login')
    //     return null
    // }

    // useEffect(() => {
    //     firebase.getCurrentUsername
    // })


    // const [tickets, setTickets] = useState([]);
    // useEffect(() => {

    //     firebase.db.collection("_tickets")
    //         .onSnapshot((snapshot) => {
    //             setTickets(snapshot.docs.map((doc) => ({
    //                 ticketTitle: doc.data().ticketTitle,
    //                 ticketDescription: doc.data().ticketDescription,
    //                 ticketType: doc.data().ticketType,
    //                 ticketStatus: doc.data().ticketStatus,
    //                 ticketPriority: doc.data().ticketPriority,
    //             })))
    //         })
    // }, [])




    // const useStyles = makeStyles((theme) => ({


    // }))
    // const classes = useStyles();
    // const theme = useTheme();


    useEffect(() => {
        console.log(currentUser)
        if (currentUser == null)
            props.history.push('login')
    }, [])

    return currentUser.displayName != null ? (
        < Box >
            <Header username={currentUser.displayName} />
            <ChartPriority />
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </Box >
    ) :
        // put on a modal
        <div>
            <form>
                <label>Username:</label>
                <input value={username} onChange={(event) => setUsername(event.target.value)} />
                <button onClick={handleUpdate}>Set username</button>
            </form>
        </div>;
}


export default withRouter(Dashboard);
