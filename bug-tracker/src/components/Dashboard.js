import React, { useState, useEffect, useContext, useCallback } from "react";
import Preview from "./Preview";
import NavBar from "./NavBar";
import Header from "./Header";
import base from "./firebase";
import firebase from 'firebase'
import { Grid, Typography, Paper, Card, Button, Link as LinkUI, Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import ChartPriority from "./ChartPriority";
import ChartStatus from "./ChartStatus";
import ChartType from "./ChartType";
import { AuthContext } from "./Auth";

function Dashboard(props) {

    const { currentUser } = useContext(AuthContext)
    const db = base.firestore();
    const [tickets, setTickets] = useState([]);
    const [projects, setProjects] = useState([])


    useEffect(() => {
        db.collection('users').doc(currentUser.uid).onSnapshot(snapshot => {
            snapshot.ref.collection('myProjects').onSnapshot(snapshot => {
                   setProjects(snapshot.docs.map(doc => ({
                        projectId: doc.data().projectId,
                        projectName: doc.data().projectName,
                        projectOwner: doc.data().projectOwner,
                    })))
            })
        })
    }, [])

    useEffect(() => {
        projects.map(project => {
            db.collection('tickets').where("projectId", "==", project.projectId)
            .onSnapshot(snapshot => {
                    setTickets(tickets => [... tickets, ... (snapshot.docs.map(doc => ({
                        ticketId: doc.id,
                        ticketDescription: doc.data().ticketDescription,
                        ticketTitle: doc.data().ticketTitle,
                        ticketCreator: doc.data().ticketCreator,
                        dateCreated: doc.data().dateCreated,
                        project: doc.data().projectId,
                        ticketPriority: doc.data().ticketPriority,
                        ticketType: doc.data().ticketType,
                        ticketStatus: doc.data().ticketStatus,
                    })))])
                   
                    })
        })
    }, [projects.length > 0])

        return (
            < Box >
            {currentUser.displayName}
            {/* <Header username={currentUser.displayName} /> */}
            <ChartPriority tickets={tickets }/>
            <ChartStatus tickets={tickets}/>
            <ChartType tickets={tickets}/>
        </Box >
    )
}


export default withRouter(Dashboard);
