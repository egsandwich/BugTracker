import React, { useState, useEffect, useContext } from 'react'
import base from './firebase'
import { Link, withRouter } from 'react-router-dom'
import { AuthContext } from './Auth'

function ProjectList() {
    const [projects, setProjects] = useState([""]);
    const { currentUser } = useContext(AuthContext)
    const [done, setDone] = useState(false)
    const db = base.firestore()

    useEffect(() => {

        db.collection("projects").where("projectOwner", "==", currentUser.uid).onSnapshot(snapshot => {
            setProjects(snapshot.docs.map(doc => ({
                id: doc.id, projectName: doc.data().projectName, projectOwner: doc.data().projectOwner
            })))
        })
        console.log(projects)

    }, [])




    return (
        <div>
            <h1>My projects</h1>
            {projects.map((project) => (
                <div>
                    <a href={`/myProjects/${project.id}`}> <p>Name: {project.projectName} </p></a>

                </div>
            ))}
        </div>
    )
}

export default withRouter(ProjectList);
