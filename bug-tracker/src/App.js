import React, { useState } from "react";
import "./App.css";

//dashboard
function App() {
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projects, setProjects] = useState([
    "Productivity App project",
    "Project2",
  ]);

  const createProject = (event) => {
    //get project name
    //get project owner
    // createProject
    event.preventDefault();
    setProjects([...projects, projectName]);
    setProjectName("");
  };

  console.log(projectName);
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

        <button type="submit" disabled={!projectName} onClick={createProject}>
          Create Project
        </button>
      </form>

      {projects.map((project) => (
        <p>{project}</p>
      ))}
    </div>
  );
}

export default App;
