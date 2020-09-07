import React, { useState, useEffect } from "react";
import db from "../components/firebase";
import firebase from 'firebase';
import { Redirect, withRouter, Route } from "react-router-dom";

{/*figure out how to redirect */ }
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


    console.log(dashState);
    return (
        <div>
            <form>
                <p>
                    <input
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                    />
                </p>
                <p>
                    <input
                        value={projectOwner}
                        onChange={(event) => setProjectOwner(event.target.value)}
                    />
                </p>

                <button type="submit" onClick={createProject}>
                    Create Project
        </button>

            </form>
            {dashState ? <Redirect to='/' /> : <Route path='/registerProject' />}
        </div>
    );
}



export default CreateProject;
