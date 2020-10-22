import React, { useState, useContext, useEffect } from "react";
import base from "./firebase";
import firebase, { firestore } from 'firebase';
import { Redirect, withRouter, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from "./Auth";

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
    const [users, setUsers] = useState([""]);
    const [projectMembers, setProjectMembers] = useState([null]);
    
    const db = base.firestore();

    useEffect(() => {
        db.collection('users').where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
        .onSnapshot(snapshot=> {
            setUsers(snapshot.docs.map(doc => ({
                userId: doc.id,
                email: doc.data().email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
            })))
        })

    }, [db.collection('users')])

    useEffect(() => {
        console.log(users)
    }, [users.length > 0])

    const createProject = (event) => {
        event.preventDefault();
        db.collection('projects').add({
            projectName: projectName,
            projectOwner: currentUser.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((docRef) => {
            try{
            db.collection('users').doc(currentUser.uid)
            .collection('myProjects').add({
                projectId: docRef.id,
                projectName, projectName,
                owner: true,
            })
            projectMembers.filter(nullChecker).map(member => {
                db.collection('users').doc(member)
                .collection('myProjects').add(
                    {projectId: docRef.id,
                    projectName: projectName, 
                    owner: false,
                }
                )})
                setProjectName("");
                setProjectMembers([""]);
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



   

    function nullChecker(value){
        return value != null
    }

    const handleCheckedValue = (event) => {
        event.preventDefault()
        if(!projectMembers.includes(event.target.value))
            setProjectMembers([... projectMembers, event.target.value])
        else
            alert("already included")
    }
    const classes = useStyles();
    return (
        <div>
            Create project
            <form>
                <label>Project name</label>
                <input value={projectName} onChange={(event) => setProjectName(event.target.value)} />
                <p><label>Add members</label> </p>
                {users.map(user =>(
                    <p key={user.userId}><button onClick={handleCheckedValue} value={user.userId}> Add </button> {user.firstName} {user.lastName} </p>
                ))}
                {/* fix this */}
                {projectMembers.map(members => (
                    <p key={members}>{members}</p>
                ))}
                <button onClick={createProject} disabled={projectName.length < 1}>Create project</button>

            </form>
            {/* <Grid>
                <Grid container>
                    <Typography variant="h4">Add project </Typography>
                </Grid>
                <form className={classes.root}>
                    <Grid container>
                        <FormControl>
                            <InputLabel>Project name</InputLabel>
                            <Input id="component-simple"
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <FormControl>
                            <InputLabel>Project Owner</InputLabel>
                            <Input id="component-simple"
                                value={projectOwner}
                                onChange={(event) => setProjectOwner(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <Button variant="contained" type="submit" onClick={createProject}>
                            Create Project
        </Button>
                    </Grid>

                </form>
            </Grid>
            */}
        </div >
    );
}



export default withRouter(CreateProject);
