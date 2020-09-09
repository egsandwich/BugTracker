import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import db from "./firebase";
import { Grid, Typography, Paper, Card, Button, Link as LinkUI } from '@material-ui/core'
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
        style: {
            backgroundColor: "blue",
            [theme.breakpoints.up("sm")]: {
                backgroundColor: "black"
            }
        },
        gridList: {
            width: '100%',
            height: '60%',
        },
        gridHeader: {
            width: '100%',
            height: '3%',
            margin: theme.spacing(1)
        }
    }))
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>
            <Grid className={classes.gridHeader}>
                <Grid container spacing={2}>
                    {/* put with grid items */}
                    <Grid item><Typography variant="h4" align='left'>Projects</Typography></Grid>
                    {/* component={<Link to="/registerProject" */}
                    <Grid item>
                        <Link to="/registerProject">
                            <LinkUI color="primary">
                                <AddCircleOutlinedIcon fontSize='large' style={{ textDecoration: 'none' }} />
                            </LinkUI>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            < Grid className={classes.gridList}>
                <Grid container spacing={0}>
                    {
                        projects.map((project) => (
                            <Grid item key={project} xs={12} sm={6} md={4} lg={4} xl={4} >
                                <Preview name={project.projectName} id={project.id} owner={project.projectOwner} />
                            </Grid>
                        ))
                    }

                </Grid>
            </Grid >
        </div >
    );
}


export default Dashboard;
