import React, { useState, useEffect } from "react";
import Project from "./Project";
import ProjectDetails from "./ProjectDetails";
import db from "./firebase";
import firebase from 'firebase';
import { Route } from "react-router-dom";

function Dashboard() {
    const [projects, setProjects] = useState([]);

    // create option to order things
    // useEffect(() => {
    //     db.collection("projects")
    //         .orderBy('projectName', 'asc')
    //         .onSnapshot((snapshot) => {
    //             setProjects(snapshot.docs.map((doc) => (doc.data())))
    //         });
    // }, [])

    useEffect(() => {
        db.collection("projects")
            .orderBy('projectName', 'asc')
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => ({ id: doc.id, projectName: doc.data().projectName, projectOwner: doc.data().projectOwner })))
                // console.log(snapshot.docs.map(doc => (doc.data().projectName)))

            })
    }, [])





    return (
        <div>
            <Route path="/projects" component={Project} />
            <Route path="/projects/:projectName" component={ProjectDetails} />

            <h2>Dashboard</h2>
            {/* pass in an object */}
            {projects.map((project) => (
                <Project name={project.projectName} id={project.id} owner={project.projectOwner} />
            ))}

        </div>
    );
}

// function getId() {
//     var docRef = db.collection("projects");

//     console.log(docRef)
// }

export default Dashboard;
