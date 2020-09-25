import React, { useState, useContext, useEffect } from "react";
import base from "./firebase";
import { AuthContext } from './Auth'
import firebase from 'firebase'
import {
    Redirect, useParams, Route, Link, withRouter
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//props = project component
function CreateTicket(props) {
    //     const
    // }
    /*EDIT THIS OUT */
    // function CreateTicket() {
    const [tickets, setTickets] = useState([{
        ticketTitle: "title",
        ticketDescription: "description",
        ticketType: "Error/Bug",
        ticketStatus: "Open",
        ticketPriority: "High",
    },]);
    const [ticketType, setTicketType] = useState("Bug/Error");
    const [ticketStatus, setTicketStatus] = useState("Open");
    const [ticketTitle, setTicketTitle] = useState();
    const [ticketDescription, setTicketDescription] = useState("");
    const [ticketPriority, setTicketPriority] = useState("Low");
    const [ticketCreator, setTicketCreator] = useState(null)
    const [formState, setFormState] = useState(false);
    const { currentUser } = useContext(AuthContext)


    useEffect(setTicketCreator(currentUser.uid), [])

    const param = useParams();
    const db = base.firestore();
    const createTicket = (event) => {
        event.preventDefault();
        db.collection("_tickets").add({
            ticketTitle: ticketTitle,
            ticketDescription: ticketDescription,
            ticketType: ticketType,
            ticketStatus: ticketStatus,
            ticketPriority: ticketPriority,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            project: param.projectId,
            ticketCreator: ticketCreator,
        }).then(() => {
            setFormState(!formState)
            setTicketTitle("")
            setTicketDescription("")
            props.history.push('/')

        });




    }

    // const createTicket = (event) => {
    //     event.preventDefault();
    //     setTickets([...tickets, {
    //         ticketTitle: ticketTitle,
    //         ticketDescription: ticketDescription,
    //         ticketType: ticketType,
    //         ticketStatus: ticketStatus
    //     },])
    // }


    return (
        <div>
            <form>
                <label>Title</label>
                <input type="text" value={ticketTitle} onChange={(event) => setTicketTitle(event.target.value)} />
                <label> Description</label>
                <input type="text" value={ticketDescription} onChange={(event) => setTicketDescription(event.target.value)} />
                <label>Type</label>
                <select value={ticketType} onChange={(event) => setTicketType(event.target.value)}>
                    <option selected value="Bug/Error">Bug/Error</option>
                    <option value="Request">Request</option>
                </select>
                <label>Status</label>
                <select value={ticketStatus} onChange={(event) => setTicketStatus(event.target.value)}>
                    <option selected value="Open">Open</option>
                    <option value="In progress">In progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <label>Priority</label>
                <select value={ticketPriority} onChange={(event) => setTicketPriority(event.target.value)}>
                    <option selected value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit" onClick={createTicket}>
                    Create Ticket
            </button>
            </form>


            {/* <Typography variant="h3">Add ticket</Typography>
            <form>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <Input id="component-simple"
                        value={ticketDescription}
                        onChange={(event) => setTicketDescription(event.target.value)}
                    />
                </FormControl>
                <Button variant="contained" type="submit" onClick={createTicket}>
                    Create Ticket
            </Button>
            </form>*/
            /* {tickets.map((ticket) => (
                <div>
                    <p> title: {ticket.ticketTitle}</p>
                    <p>description: {ticket.ticketDescription} </p>
                    <p> type: {ticket.ticketType} </p>
                    <p>status: {ticket.ticketStatus} </p>
                </div>

            )

            )}
        
            ); */}
            {/* redirect to ticket summary? */}
            {/* { formState ? <Redirect to={'/'} /> : <Route path={`${param.projectId}/registerTicket`} />} */}
        </div >
    )
}

export default withRouter(CreateTicket);
