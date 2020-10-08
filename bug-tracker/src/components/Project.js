import React, { useEffect, useState } from "react";
import base from './firebase';
import firebase from 'firebase';
import { withRouter, useParams, Link, Redirect } from "react-router-dom";
import { Grid, Typography, Paper, Card, Button, Link as LinkUI } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Ticket from "./Ticket";


function Project(props) {
  const db = base.firestore()
  const params = useParams();

  const [nameOfProj, setNameOfProj] = useState("");
  const [dateCreated, setDateCreated] = useState(null);
  const [tickets, setTickets] = useState([]);



  useEffect(() => {
    db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', params.projectId)
      .onSnapshot(snapshot => snapshot.docs.forEach(doc => {
        setNameOfProj(doc.data().projectName)
        setDateCreated(doc.data().dateCreated.seconds * 1000)
      }
      ))

  }, [db, params.projectId]);



  useEffect(() => {
    db.collection("_tickets").where("project", "==", params.projectId)
      .onSnapshot(snapshot => {
        setTickets(snapshot.docs.map(doc => ({
          id: doc.id, dateCreated: doc.data().dateCreated,
          ticketCreator: doc.data().ticketCreator,
          ticketDescription: doc.data().ticketDescription,
          ticketPriority: doc.data().ticketPriority,
          ticketStatus: doc.data().ticketStatus,
          ticketType: doc.data().ticketType,
          ticketTitle: doc.data().ticketTitle
        })))
      })

  }, [db, params.projectId])

  const clickHandler = () => {
    props.history.push(`/${params.projectId}/addTicket`)

  }
  return (
    <div>
      <p>{nameOfProj}</p>
      <p>Date created: {new Date(dateCreated).toLocaleDateString('no-NO')}</p>
      <p><button onClick={clickHandler}>Add Ticket</button></p>
      <></>
      <p><b>Tickets</b></p>
      {tickets.map((ticket) => (
        <div>
          <Link to={`/${params.projectId}/${ticket.id}`}>
            <p>{ticket.ticketTitle}</p>
            <p>{ticket.ticketStatus}</p>
            <p>{ticket.ticketPriority}</p>
            <p>{ticket.ticketType}</p>
          </Link>
        </div>
      ))}
    </div >
  );
}



export default withRouter(Project);

{/* <Grid className={classes.gridHeader}>
<Grid container spacing={2}>
  <Grid item><Typography variant="h4">Tickets on {nameOfProj} </Typography></Grid>
  <Grid item>
    <Link to={`/${params.projectId}/registerTicket`}>
      <LinkUI color="primary">
        <AddCircleOutlinedIcon fontSize='large' style={{ textDecoration: 'none' }} />
      </LinkUI>
    </Link>
  </Grid>
</Grid>
<Grid container item margin='1'><Typography variant="h5">Admin: {nameOfOwner} </Typography></Grid>
</Grid>
<Grid className={classes.gridList}>
<Grid container spacing={0}>
  {tickets.map((ticket) => (
    <Ticket description={ticket.ticketDescription} />
  ))
  }
</Grid>
</Grid> */}

// const useStyles = makeStyles((theme) => ({
//   style: {
//     backgroundColor: "blue",
//     [theme.breakpoints.up("sm")]: {
//       backgroundColor: "black"
//     }
//   },
//   gridList: {
//     width: '100%',
//     height: '60%',
//   },
//   gridHeader: {
//     width: '100%',
//     height: '3%',
//     margin: theme.spacing(1)
//   }
// }))
// const classes = useStyles();