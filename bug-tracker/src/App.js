import React, { useState, useEffect } from "react";
import "./App.css";
import Project from "./Project";
import db from "./firebase";
import firebase from 'firebase'

//dashboard
function App() {
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projects, setProjects] = useState([]);

  const createProject = (event) => {
    //get project name
    //get project owner
    // createProject
    event.preventDefault();

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
  //in use effect for the future, check if logged in

  //useEffect(() => {}, [
  //put condition here
  //]); //run code in a condition in react


  // create option to order things
  useEffect(() => {
    db.collection("projects")
      .orderBy('projectName', 'asc')
      .onSnapshot((snapshot) => {
        setProjects(snapshot.docs.map((doc) => doc.data()))
      });
  }, [])

  console.log(projects);
  return (
    <div className="App">
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

      {projects.map((project) => (
        <Project name={project.projectName} owner={project.projectOwner} />
      ))}
    </div>
  );
}

export default App;
