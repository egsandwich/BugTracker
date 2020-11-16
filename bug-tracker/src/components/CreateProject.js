import React, { useState, useContext, useEffect } from "react";
import base from "./firebase";
import firebase, { firestore } from 'firebase';
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from "./Auth";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));





function CreateProject(props) {
    const { currentUser } = useContext(AuthContext)
    const [projectName, setProjectName] = useState("");
    const [users, setUsers] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);
    const [allCheckDefault, setAllCheckDefault] = useState(false);
    
    const db = base.firestore();

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

    }, [])

    useEffect(() => {
    console.log(projectMembers)
    }, [projectMembers])

    const createProject = (event) => {
        event.preventDefault();
        db.collection('projects').add({
            projectName: projectName,
            projectOwner: currentUser.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((docRef) => {
            try{
            db.collection('users').doc(currentUser.uid)
            .collection('myProjects').doc(docRef.id).set({
                projectId: docRef.id,
                projectName, projectName,
                owner: true,
            })
            projectMembers.map(member => {
                db.collection('users').doc(member.userId)
                .collection('myProjects').doc(docRef.id).set(
                    {
                    projectId: docRef.id,
                    projectName: projectName, 
                    owner: false,
                    userOwner: currentUser.uid,
                }
                )})
                setProjectName("");
                setProjectMembers([]);
                setUsers(users.map(u => {
                    if(u.select){
                        u.select = !u.select;
                    }
                    return u;
                }))
                setAllCheckDefault(false);
                props.history.push('/myProjects')
                } 
                catch (error) {
                    db.collection('projects').doc(docRef.id)
                    .delete().then(
                        props.history.push('/addProject')
                    )
                    alert("Something went wrong. Please try again.")
                }
         
        })
    };
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

   


    const classes = useStyles();
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
                        <table>
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
                        </table>
                        <Button variant="contained" size="small" onClick={addMemberHandler}>Add members</Button>
                    </Grid>
              
                    <Grid item xs={12} md={6} xl={4}>
                        Added members here
                    </Grid>
                    
                        <Grid item xs={12}>
                            <Button onClick={createProject} variant="contained" type="submit" disabled={projectName.length < 1}>
                                Create Project
                            </Button>
                        </Grid>

                </Grid>
           </Box>
        </div >
    );
}



export default withRouter(CreateProject);
