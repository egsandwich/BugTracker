import React, { useState, useContext, useEffect } from "react";
import base from "./firebase";
import firebase from 'firebase';
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
    const [projectOwner, setProjectOwner] = useState(null);

    useEffect(() => {
        setProjectOwner(currentUser.uid)
    }, [])
    // const [projects, setProjects] = useState([]);
    // const [tickets, setTickets] = useState([]);

    const db = base.firestore();

    //this.setState({ dashboard: false });
    const [dashState, setDashState] = useState(false);
    const createProject = (event) => {
        event.preventDefault();
        db.collection('projects').add({
            projectName: projectName,
            projectOwner: projectOwner,
            //time?  
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            db.collection('users').doc(currentUser.uid)
                .update({
                    isModerator: true
                })
            setDashState(!dashState)
            setProjectName("");
            props.history.push('/')
        })

    };


    const classes = useStyles();
    // console.log(dashState);
    return (
        <div>
            Create project
            <form>
                <label>Project name</label>
                <input value={projectName} onChange={(event) => setProjectName(event.target.value)} />
                <button onClick={createProject}>Create project</button>

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
