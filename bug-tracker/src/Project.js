import React, { useEffect, useState } from "react";
import db from './firebase';
import firebase from 'firebase';
import { withRouter, useParams, Link } from "react-router-dom";
import CreateTicket from "./CreateTicket";


{/* put animation on the name of the project to indicate that it is clickable */ }
function Project(props) {

  const [nameOfProj, setNameOfProj] = useState("");

  const params = useParams();
  // console.log(params.projectId)


  useEffect(() => {
    db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', params.projectId)
      .get().then(snapshot => snapshot.docs.forEach(doc => {
        saveProjectName(doc)
      }

      ))

  });

  function saveProjectName(a) {
    setNameOfProj(a.data().projectName)

  }

  function createTicket() {

  }
  return (
    <div>
      <h2>{nameOfProj}</h2>
      <p></p>
      <Link to={`/${params.projectId}/registerTicket`}>
        Add Ticket
      </Link>
      {/*{props.owner}*/}
    </div >
  );
}



export default withRouter(Project);
