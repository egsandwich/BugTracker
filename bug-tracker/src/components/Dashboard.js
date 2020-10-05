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

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser != null) {
            if (currentUser.displayName != null) {
                base.firestore().collection('users').where('userId', '==', currentUser.uid)
                    .get().then(snapshot => snapshot.docs.forEach(doc => {
                        currentUser.updateProfile({
                            displayName: doc.data().firstName + " " + doc.data().lastName
                        })
                    }))
            }
        }
    }, [])


    const logout = () => {
        base.auth().signOut().then(
            props.history.push('/login')
        )
    }

    return (
        < Box >
            <Header username={currentUser.displayName} />
            <ChartPriority />
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </Box >
    )
}


export default withRouter(Dashboard);
