import React, { useState, useEffect } from "react";
import Project from "./Project";
import db from "./firebase";
import firebase from 'firebase';

function Dashboard() {
    const [projects, setProjects] = useState([]);



    // create option to order things
    useEffect(() => {
        db.collection("projects")
            .orderBy('projectName', 'asc')
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => doc.data()))
            });
    }, [])
    return (
        <div>
            <h2>Dashboard</h2>
            {projects.map((project) => (
                <Project name={project.projectName} owner={project.projectOwner} />
            ))}
        </div>
    );
}

export default Dashboard;
