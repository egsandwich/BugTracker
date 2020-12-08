import React, { useState, useEffect, useContext } from 'react'
import base from '../firebase'
import { Link, withRouter } from 'react-router-dom'
import { Typography, Box, Grid, Card, CardContent, CardActionArea, CardActions, Button, Paper, MenuItem, ListItemText} from '@material-ui/core/';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useAuth } from '../contexts/AuthContext'

function ProjectList() {
    const [projectsOwn, setProjectsOwn] = useState([""]);
    const [projectsBelong, setProjectsBelong] = useState([""]);
    const db = base.firestore()
    const {currentUser} = useAuth()

    useEffect(() => {
        db.collection("projects").where("projectOwner", "==", currentUser.uid).onSnapshot(snapshot => {
            setProjectsOwn(snapshot.docs.map(doc => ({
                id: doc.id, projectName: doc.data().projectName, projectOwner: doc.data().projectOwner
            })))
        })

    }, [currentUser.uid, db.collection("projects")])

    useEffect(() => {
        db.collection('users').doc(currentUser.uid)
        .onSnapshot(snapshot => {
            snapshot.ref.collection('myProjects').where("owner", "==", false).onSnapshot(snapshot => {
                setProjectsBelong(snapshot.docs.map(doc => ({
                    projectId: doc.data().projectId,
                    projectName: doc.data().projectName,
                })))
            })
        })
        
    }, [currentUser.uid, db])


    return (
        <div>
            <Box m={3}>
            <Grid container spacing={4}>
            <Grid item xs={12} >
            <Typography variant="h6">Projects I manage</Typography>
            {projectsOwn.map((project) => (
                <div key={project.id}>
                    <Card>
                        <CardContent>
                                <Typography variant="body1">{project.projectName}</Typography>
                                <CardActionArea>
                                <CardActions>
                                    <Button href={`/detail/${project.id}`}>Details</Button>
                                </CardActions>
                            </CardActionArea>
                        </CardContent>
                    </Card>
                </div>
            ))}
            </Grid>

            <Grid item xs={12} >
            <AssignmentIcon/>    
            <Typography variant="h6">Projects I belong in
            </Typography>
            {projectsBelong.map((project) => (
                <div key={project.projectId}>
                    <Card>
                        <CardContent>
                                <Typography variant="body1">{project.projectName}</Typography>
                                <CardActionArea>
                                <CardActions>
                                    <Button href={`/detail/${project.projectId}`}>Details</Button>
                                </CardActions>
                            </CardActionArea>
                        </CardContent>
                    </Card>
                </div>
            ))}
            </Grid>
            </Grid>
            </Box>
        </div>
    )
}

export default ProjectList;
