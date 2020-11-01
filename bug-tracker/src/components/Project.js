import React, { useEffect, useState } from "react";
import base from './firebase';
import firebase from 'firebase';
import { withRouter, useParams, Link, Redirect } from "react-router-dom";
import { Grid, Box, Typography, Paper, Card, Button, Link as LinkUI, CardContent, CardActionArea, CardActions } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Ticket from "./Ticket";


function Project(props) {
  const params = useParams();
  const db = base.firestore()


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
    db.collection('tickets').where("projectId", "==", params.projectId)
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
      <Box m={3}>
      <Grid container>
        <Grid item xs={12}>
        <Typography variant="h6">{nameOfProj}</Typography>
        </Grid>
        <Typography variant="subtitle1">Date created: {new Date(dateCreated).toLocaleDateString('no-NO')}</Typography>
        <Grid item xs={12}>
        <Button variant="contained" onClick={clickHandler}>Add Ticket</Button>
        </Grid>
      </Grid>
      {tickets.map((ticket) => (
        <Grid item key={ticket.id}>
          <div>
           <TicketListItem item ={ticket}/>
           </div>
        </Grid>
      ))}
      </Box>
    </div >
  );
}



export default withRouter(Project);

function TicketListItem(props){
  const{id, ticketTitle, ticketPriority, ticketStatus,ticketType} = props.item

  const params = useParams();
  const linkRef=`/tickets/${params.projectId}/${id}`;
  
  return (
    <Card>
      <CardContent>
      <Typography>{ticketTitle}</Typography>
      <Typography>Status: {ticketStatus}</Typography>
      <Typography>Priority: {ticketPriority}</Typography>
      <Typography>Type: {ticketType}</Typography>
      <CardActionArea>
        <CardActions>
          <Button variant="contained" size="small" href={linkRef}>Learn more</Button>
        </CardActions>
      </CardActionArea>
      </CardContent>
    </Card>
  );

}

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