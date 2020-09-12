import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import NavBar from "./NavBar";
import Header from "./Header";
import db from "./firebase";
import { Grid, Typography, Paper, Card, Button, Link as LinkUI, Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Dashboard() {
    //backend
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        db.collection("projects")
            .orderBy('projectName', 'asc')
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => ({ id: doc.id, projectName: doc.data().projectName, projectOwner: doc.data().projectOwner })))
                // console.log(snapshot.docs.map(doc => (doc.data().projectName)))

            })
    }, [])


    const useStyles = makeStyles((theme) => ({


    }))
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box>
            <Header />
            <Grid container>
                {
                    projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Preview name={project.projectName} id={project.id} owner={project.projectOwner} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}


export default Dashboard;
