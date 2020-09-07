import React, { useState } from "react";
import db from "./firebase";
import firebase from 'firebase';
import { Redirect, useParams, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button'

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
            <h1> Reg Ticket</h1>
            <form>
                <p>
                    <input
                        value={ticketDescription}
                        onChange={(event) => setTicketDescription(event.target.value)}
                    />
                </p>

                <Link to={`/ticket/${param.projectId}`}>
                    <Button variant="contained" color="primary" type="submit" onClick={createTicket}>
                        Create Ticket
            </Button>
                </Link>
            </form>
            {formState ? <Redirect to={`/tickets/${param.projectId}`} /> : <Route path='/registerProject' />}
        </div >
    );
}

export default CreateTicket;