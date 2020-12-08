import React, { useState, useRef, useEffect, useReducer } from "react";
import base from "../firebase";
import firebase, { firestore } from 'firebase';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from "../contexts/AuthContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";


function CreateProject(props) {
    const [projectName, setProjectName] = useState("");
    const [users, setUsers] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);
    // const reducer = (state, action) => ({...state, ...action})
    // const [listState, setListState] = useReducer(reducer, users);
    const pointer = useRef()
    const buttonPointer = useRef()
    // const [allCheckDefault, setAllCheckDefault] = useState(false);
    const [loading, setLoading] = useState(false)
    const history =  useHistory()
    // const [state, dispatch] = useReducer(reducer, {select: false })
    const db = base.firestore();
    const {currentUser} = useAuth()
    const [loadingOnAddMembers, setLoadingOnAddMembers] = useState(false)
    

    useEffect(() => {
        db.collection('users').where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
        .onSnapshot(snapshot=> {
            setUsers(snapshot.docs.map(doc => ({
                userId: doc.id,
                email: doc.data().email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                select: false,
            })))
        })

    }, [db])


    async function createProject(event){
        event.preventDefault();
        try{
            setLoading(true)
            var newProject = db.collection('projects').doc();
            await newProject.set({
                projectName: projectName,
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
                    )})
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
        //to default
        setProjectName("");
        setProjectMembers([]);
        setUsers(users.map(u => {
            if(u.select){
                u.select = !u.select;
            }
            return u;
        }))
        setLoading(false)
    }


    const addMemberHandler = (event) => {
        users.map(user => {
            if(user.select){
                setProjectMembers(projectMembers => [... projectMembers, {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }])
                
            }
        })
    }

  
    function addToList(index){
        const query = projectMembers.find(member => member.email === users[index].email);
        if(query == null)
        setProjectMembers (projectMembers => projectMembers.concat({email: users[index].email, userId: users[index].userId}))
        else
        //change this to error
        alert("MEEPMORP")

    }

    return (
        <div>
            <Box m={2} flexGrow={1}>
                <Grid container spacing={2} >
                <Grid item xs={2} md={1}>
                    <IconButton component={Link} to={'/'}>
                            <ArrowBackIcon fontSize="small"/>
                        </IconButton>
                    </Grid>
                <Grid item xs={10} md={11}>
                    <Typography variant="h4">Add project</Typography>
                    </Grid>
                    <Grid item xs={12} xl={4}>
                    <form>
                        <FormControl>
                            <InputLabel>Project name</InputLabel>
                            <Input required
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}
                            />
                        </FormControl>
                    </form>
                    </Grid>
                

                <Grid item xs={12} md={6} xl={4}>
                    <Typography variant="h5">Add members</Typography>
                        
                            {console.log("here")}
                            {/* {console.log(projectMems.current[0].select)} */}
                            <FormControl>
                                <FormGroup>
                                        {users.map((user, index) => (
                                            <p><Button onClick={() => {
                                                pointer.current = user.userId;
                                                addToList(index);
                                            }}>Add</Button> {user.email} </p>
                                        ))}
                                    </FormGroup>
                                </FormControl>
                    </Grid>
              
                    <Grid item xs={12} md={6} xl={4}>
                        Added members here
                        
                        {projectMembers.map(member => (
                            <p>
                                {member.email}
                            </p>
                        ))}
                    </Grid>
                    
                        <Grid item xs={12}>
                            <Button onClick={createProject} variant="contained" type="submit" disabled={projectName.length < 1 || loading}>
                                Create Project
                            </Button>
                        </Grid>

                </Grid>
           </Box>
        </div >
    );
}



export default CreateProject;


{/* <table>
                            <thead>
                                <tr>
                                <th scope="col">
                                    <Checkbox checked={allCheckDefault} onChange={(event) => {
                                        setUsers(users.map(user => {
                                            user.select = event.target.checked; 
                                            return user;
                                        }))
                                        setAllCheckDefault(!allCheckDefault);
                                    }}/>
                                </th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(user =>(
                                <tr>
                                    <th scope="col">
                                        <Checkbox checked={user.select} onChange={(event) => {
                                            setUsers(users.map(u => {
                                                let checked = event.target.checked;
                                                if(user.userId === u.userId){
                                                u.select = checked;
                                                }
                                                return u;
                                            }))
                                        }}/>
                                    </th>
                                    <th scope="col">{user.firstName}</th>
                                    <th scope="col">{user.lastName}</th>
                                    <th scope="col">{user.email}</th>
                                </tr>
                    ))}
                            </tbody>
                        </table> */}
                        {/* <FormControl component="fieldset">
                            <FormGroup>
                                {users.map(user => (
                                    <FormControlLabel label={user.email}
                                    control={<Checkbox checked={user.select} onChange={(e) => {
                                        setUsers(u => {
                                            let cheked = e.target.checked; 
                                            if(user.userId === u.userId) {
                                            u.select = cheked;
                                            }
                                            return u;
                                        })
                                    }}/>}
                                />
                                ))}
                                

                            </FormGroup>
                        <Button variant="contained" size="small" onClick={addMemberHandler}>Add members</Button>
                        </FormControl> */}


