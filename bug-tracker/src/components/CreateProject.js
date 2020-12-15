import React, { useState, useRef, useEffect } from "react";
import base from "../firebase";
import firebase, { firestore } from 'firebase';
import { useHistory, Link } from "react-router-dom";
import { Box, FormControl, Input, InputLabel, Button, Typography, IconButton, Grid, FormGroup, } from '@material-ui/core/';
import { useAuth } from "../contexts/AuthContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


function CreateProject() {
    const projectName = useRef()
    const [users, setUsers] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const db = base.firestore();
    const { currentUser } = useAuth()


    useEffect(() => {
        db.collection('users').where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
            .onSnapshot(snapshot => {
                setUsers(snapshot.docs.map(doc => ({
                    userId: doc.id,
                    email: doc.data().email,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    select: false,
                })))
            })

    }, [db])


    async function createProject(event) {
        event.preventDefault();
        try {
            setLoading(true)
            var newProject = db.collection('projects').doc();
            await newProject.set({
                projectName: projectName.current.value,
                projectOwner: currentUser.uid,
                dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            try {
                await db.collection('users').doc(currentUser.uid)
                    .collection('myProjects').doc(newProject.id).set({
                        projectId: newProject.id,
                        projectName, projectName,
                        owner: true,
                    })
                projectMembers.map(member => {
                    db.collection('users').doc(member.userId)
                        .collection('myProjects').doc(newProject.id).set(
                            {
                                projectId: newProject.id,
                                projectName: projectName,
                                owner: false,
                                userOwner: currentUser.uid,
                            }
                        )
                })
                history.push('/myProjects')
            }
            catch (error) {
                await db.collection('projects').doc(newProject.id)
                    .delete()
                alert("Something went wrong on adding to user. Please try again.")
            }
        } catch {
            alert("Something went wrong. Please try again.")
        }
        setProjectMembers([]);
        setLoading(false)
    }



    function addToList(index) {
        const query = projectMembers.find(member => member.email === users[index].email);
        if (query == null)
            setProjectMembers(projectMembers => projectMembers.concat({ email: users[index].email, userId: users[index].userId }))
        else
            //change this to error
            alert("MEEPMORP")

    }

    function removeFromList(member) {
        setProjectMembers(projectMembers.filter(pM => pM !== member))
    }

    return (
        // try other values
        <Box m={4}>
            <Grid container spacing={2} justify="center">
                <Grid item xs={2} >
                    <IconButton component={Link} to={'/'}>
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h4">Add project</Typography>
                </Grid>
                <Grid item xs={12} xl={4}>
                    <form>
                        <FormControl>
                            <InputLabel>Project name</InputLabel>
                            <Input required ref={projectName} />
                        </FormControl>
                    </form>
                </Grid>


                <Grid item xs={12} md={6} xl={4}>
                    <Typography variant="h6">Add members</Typography>
                    <FormControl>
                        <FormGroup>
                            {users.map((user, index) => (
                                <p key={index}><IconButton onClick={() => {
                                    addToList(index)
                                }}><AddCircleOutlineOutlinedIcon /> </IconButton> {user.email} </p>
                            ))}
                        </FormGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                    <Typography variant="h6">Added members here</Typography>
                    {projectMembers.map((member) => (
                        <p key={member.email}><IconButton onClick={() => {
                            removeFromList(member)
                        }}><RemoveCircleOutlineIcon /></IconButton> {member.email} </p>
                    ))}
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={createProject} color="primary" variant="contained" type="submit" disabled={projectName.length < 1 || loading}>
                        Create Project
                            </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreateProject;