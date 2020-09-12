import React, { useState } from "react";
import db from "./firebase";
import firebase from 'firebase';
import { Redirect, useParams, Route, Link } from "react-router-dom";
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
    {/*EDIT THIS OUT */ }
    // function CreateTicket() {
    const [tickets, setTickets] = useState(["Theres a bug on line 18", "Tomorrow    "]);
    const [ticketDescription, setTicketDescription] = useState("");
    const [formState, setFormState] = useState(false);
    const [name, setName] = useState("")



    const param = useParams();

    const createTicket = (event) => {
        event.preventDefault();
        db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', param.projectId)
            .get().then(snapshot => snapshot.docs.forEach(doc => {
                var projName = doc.data().projectName;
                setName(projName)
                doc.ref.collection("_tickets").add({
                    ticketDescription: ticketDescription,
                    dateCreated: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
            )).then(() =>
                setFormState(!formState))
        setTicketDescription("");
    }


    {/*
        create a collection from the project document 
        try to automate na yung name of the ticket collection would be nameofproject append tickets
        then redirect to project container updated with the ticket
    */}



    return (
        <div>
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
            </form>
            {formState ? <Redirect to={`/tickets/${param.projectId}`} /> : <Route path='/registerProject' />} */}
            Create ticket
        </div >
    );
}

export default CreateTicket;
