import React, { useState, useEffect } from "react";
import db from "../components/firebase";
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

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function goToDashboard(e) {
    e.preventDefault()
    this.props.history.push('/dashboard');

}


function CreateProject(props) {
    const [projectName, setProjectName] = useState("");
    const [projectOwner, setProjectOwner] = useState("");
    // const [projects, setProjects] = useState([]);
    // const [tickets, setTickets] = useState([]);

    //this.setState({ dashboard: false });
    const [dashState, setDashState] = useState(false);
    const createProject = (event) => {
        event.preventDefault();
        {/*copy this code for creating tickets*/ }
        db.collection('projects').add({
            projectName: projectName,
            projectOwner: projectOwner,
            //time?  
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => setDashState(!dashState))
        setProjectName("");
        setProjectOwner("");
    };


    const classes = useStyles();
    // console.log(dashState);
    return (
        <div>
            Create project
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
            {dashState ? <Redirect to='/' /> : <Route path='/registerProject' />} */}
        </div >
    );
}



export default CreateProject;
