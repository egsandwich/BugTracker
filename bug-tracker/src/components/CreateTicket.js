// import React, { useState, useContext, useEffect } from "react";
// import base from "../firebase";
// import {useAuth} from '../contexts/AuthContext'
// import firebase from 'firebase'
// import {useParams, withRouter, Link} from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Button from '@material-ui/core/Button';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Typography from '@material-ui/core/Typography';
// import {Grid, Box, Select, MenuItem, IconButton} from '@material-ui/core/';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// //props = project component
// function CreateTicket(props) {
   
//     const [tickets, setTickets] = useState([{
//         ticketTitle: "title",
//         ticketDescription: "description",
//         ticketType: "Error/Bug",
//         ticketStatus: "Open",
//         ticketPriority: "High",
//     },]);
//     const [ticketType, setTicketType] = useState("Bug/Error");
//     const [ticketStatus, setTicketStatus] = useState("Open");
//     const [ticketTitle, setTicketTitle] = useState("");
//     const [ticketDescription, setTicketDescription] = useState("");
//     const [ticketPriority, setTicketPriority] = useState("Low");
//     const [formState, setFormState] = useState(false);
//     // const { currentUser } = useContext(AuthContext)
 

//     const param = useParams();
//     const db = base.firestore();
//     const createTicket = (event) => {
//         event.preventDefault();
//         try{
//         db.collection("tickets").add({
//             projectId: param.projectId,
//             ticketTitle: ticketTitle,
//             ticketDescription: ticketDescription,
//             ticketType: ticketType,
//             ticketStatus: ticketStatus,
//             ticketPriority: ticketPriority,
//             dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
//             ticketCreator: currentUser.uid,}).then(() => {
//             setFormState(!formState)
//             setTicketTitle("")
//             setTicketDescription("")
//             props.history.push(`/detail/${param.projectId}`)

//         })} catch(error) {
//             alert("Something went wrong. Please try again");

//         }

//     }  

    
//     return (
//         <div>
//             <Box m={2} flexGrow={1}>
//             <Grid container spacing={2}>
//             <Grid item xs={1} md={1}>
//                     <IconButton component={Link} to={`/detail/${param.projectId}`}>
//                             <ArrowBackIcon fontSize="small"/>
//                         </IconButton>
//                     </Grid> 
//             <Grid item xs={11} >
//                     <Typography variant="h4">Add Ticket </Typography>
//             </Grid>     
//             <form>
//                 <Grid item xs={12}>
//                     <FormControl>
//                         <InputLabel>Title</InputLabel>
//                         <Input type="text" value={ticketTitle} onChange={(event) => setTicketTitle(event.target.value)} />
//                         </FormControl>
//                 </Grid>

//                     <Grid item xs={12}>
//                         <FormControl>
//                         <InputLabel> Description</InputLabel>
//                         <Input type="text" value={ticketDescription} onChange={(event) => setTicketDescription(event.target.value)} />
//                         </FormControl>
//                     </Grid>
                    
//                     <Grid item xs={2}>
//                     <InputLabel>Type</InputLabel>
//                     <FormControl>
//                     <Select id="ticketType" value={ticketType} onChange={(event) => setTicketType(event.target.value)}>
//                         <MenuItem value="Bug/Error">Bug/Error</MenuItem>
//                         <MenuItem value="Request">Request</MenuItem>
//                     </Select>
//                     </FormControl>
//                     </Grid>

//                     <Grid item xs={2}>
//                     <InputLabel>Status</InputLabel>
//                     <FormControl>
//                     <Select value={ticketStatus} onChange={(event) => setTicketStatus(event.target.value)}>
//                         <MenuItem value="Open">Open</MenuItem>
//                         <MenuItem value="In progress">In progress</MenuItem>
//                         <MenuItem value="Resolved">Resolved</MenuItem>
//                     </Select>
//                     </FormControl>
//                     </Grid>

//                     <Grid item xs={2}>
//                     <InputLabel>Priority</InputLabel>
//                     <FormControl>
//                     <Select value={ticketPriority} onChange={(event) => setTicketPriority(event.target.value)}>
//                         <MenuItem value="Low">Low</MenuItem>
//                         <MenuItem value="Medium">Medium</MenuItem>
//                         <MenuItem value="High">High</MenuItem>
//                     </Select>
//                     </FormControl>
//                     </Grid>  
//                 </form>
//                 <Grid item xs={12} >
//                 <Button variant="contained" type="submit" disabled={ticketTitle.length === 0 || ticketDescription.length === 0} onClick={createTicket}>
//                         Create Ticket
//                 </Button>
//                 </Grid> 
//             </Grid>
//             </Box>
//         </div >
//     ) 
// }

// export default withRouter(CreateTicket);
