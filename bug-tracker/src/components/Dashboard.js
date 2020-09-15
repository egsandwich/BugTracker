import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import NavBar from "./NavBar";
import Header from "./Header";
import firebase from "./firebase";
import { Grid, Typography, Paper, Card, Button, Link as LinkUI, Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import ChartPriority from "./ChartPriority";

function Dashboard(props) {
    //backend

    console.log(firebase.getCurrentUsername())
    if (!firebase.getCurrentUsername()) {
        alert('Please login first')
        props.history.replace('login')
        return null
    }

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
    return (
        <Box>
            <Header />
            {/* {tickets.map((ticket) => (
                <div>
                    <p> title: {ticket.ticketTitle}</p>
                    <p>description: {ticket.ticketDescription} </p>
                    <p> type: {ticket.ticketType} </p>
                    <p>status: {ticket.ticketStatus} </p>
                    <p>priority: {ticket.ticketPriority} </p>


                </div>


            )

            )} */}
            <ChartPriority />
            <div>
                <button>Logout</button>
            </div>
        </Box>
    );
}


export default withRouter(Dashboard);
