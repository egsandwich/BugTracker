import React, { useEffect, useState } from "react";
import db from './firebase';
import firebase from 'firebase';
import { withRouter, useParams, Link } from "react-router-dom";
import Ticket from "./Ticket";


function Project(props) {

  const [nameOfProj, setNameOfProj] = useState("");
  const [tickets, setTickets] = useState([]);

  const params = useParams();
  // console.log(params.projectId)


  useEffect(() => {
    db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', params.projectId)
      .get().then(snapshot => snapshot.docs.forEach(doc => {
        saveProjectName(doc)
      }

      ))

  });


  useEffect(() => {
    db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', params.projectId)
      .get().then(snapshot => snapshot.docs.forEach(doc => {
        doc.ref.collection("_tickets").onSnapshot(snapshot => {
          setTickets(snapshot.docs.map(doc => ({
            id: doc.id,
            ticketDescription: doc.data().ticketDescription
          })) //map
          )
        })

      }))
  }, [])

  function saveProjectName(a) {
    setNameOfProj(a.data().projectName)

  }

  function createTicket() {

  }
  return (
    <div>
      <h2>{nameOfProj}</h2>
      {/* pass in an object */}
      {tickets.map((ticket) => (
        <Ticket description={ticket.ticketDescription} />

      ))
      }
      <Link to={`/${params.projectId}/registerTicket`}>
        Add Ticket
      </Link>
      {/*{props.owner}*/}
    </div >
  );
}



export default withRouter(Project);
