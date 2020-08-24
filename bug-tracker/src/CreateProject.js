import React, { useState } from "react";
import db from "./firebase";
import firebase from 'firebase';
import { Redirect } from "react-router-dom";

function CreateProject(props) {
    const [projectName, setProjectName] = useState("");
    const [projectOwner, setProjectOwner] = useState("");
    const [projects, setProjects] = useState([]);
    const [tickets, setTickets] = useState([]);


    const createProject = (event) => {
        //get project name
        //get project owner|
        // createProject
        event.preventDefault();
        {/*copy this code for creating tickets*/ }
        db.collection('projects').add({
            projectName: projectName,
            projectOwner: projectOwner,
            //time?  
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        })
        /* setProjects([
           ...projects,
           { projectName: projectName, projectOwner: projectOwner },
         ]); save locally
         */
        setProjectName("");
        setProjectOwner("");
    };
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
        </div>
    );
}

export default CreateProject;
