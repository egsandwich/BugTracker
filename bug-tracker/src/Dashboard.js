import React, { useState, useEffect } from "react";
import Project from "./Project";
import Preview from "./Preview";
import db from "./firebase";
import firebase from 'firebase';
import { Route, Link } from "react-router-dom";

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

            <h2>Dashboard</h2>
            {/* pass in an object */}
            {projects.map((project) => (
                // <Project name={project.projectName} id={project.id} owner={project.projectOwner} />
                <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }} >
                    <Preview name={project.projectName} id={project.id} owner={project.projectOwner} />
                    {/* put margins here? */}
                </Link>

            ))
            }


        </div >
    );
}


export default Dashboard;
