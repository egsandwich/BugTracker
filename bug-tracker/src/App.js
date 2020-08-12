import React, { useState, useEffect } from "react";
import "./App.css";
import Project from "./Project";
//dashboard
function App() {
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projects, setProjects] = useState([
    { projectName: "Productivity app", projectOwner: "Eg" },
    { projectName: "Project2", projectOwner: "enah" },
  ]);

  const createProject = (event) => {
    //get project name
    //get project owner
    // createProject
    event.preventDefault();
    setProjects([
      ...projects,
      { projectName: projectName, projectOwner: projectOwner },
    ]);
    setProjectName("");
  };
  //in use effect for the future, check if logged in

  useEffect(() => {}, [
    //put condition here
  ]);

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
