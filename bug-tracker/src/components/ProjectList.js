import React, { useState, useEffect, useContext } from 'react'
import base from './firebase'
import firebase from 'firebase'
import { Link, withRouter } from 'react-router-dom'
import { AuthContext } from './Auth'

function ProjectList() {
    const [projectsOwn, setProjectsOwn] = useState([""]);
    const [projectsBelong, setProjectsBelong] = useState([""]);
    const { currentUser } = useContext(AuthContext)
    const [done, setDone] = useState(false)
    const db = base.firestore()

    useEffect(() => {

        db.collection("projects").where("projectOwner", "==", currentUser.uid).onSnapshot(snapshot => {
            setProjectsOwn(snapshot.docs.map(doc => ({
                id: doc.id, projectName: doc.data().projectName, projectOwner: doc.data().projectOwner
            })))
        })

    }, [])

    useEffect(() => {
        db.collection('users').doc(currentUser.uid)
        .onSnapshot(snapshot => {
            snapshot.ref.collection('myProjects').where("owner", "==", false).onSnapshot(snapshot => {
                setProjectsBelong(snapshot.docs.map(doc => ({
                    projectId: doc.data().projectId,
                    projectName: doc.data().projectName,
                })))
            })
        })
        
    }, [])


    return (
        <div>
            <h1>Projects I manage</h1>
            {projectsOwn.map((project) => (
                <div>
                    <a href={`/detail/${project.id}`}> <p>Name: {project.projectName} </p></a>

                </div>
            ))}
            <></>
            <h1>Projects I belong in</h1>
            {projectsBelong.map((project) => (
                <div>
                    {project.projectName}
                </div>
            ))}
        </div>
    )
}

export default withRouter(ProjectList);
