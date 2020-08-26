import React, { useState } from "react";
import db from "./firebase";
import firebase from 'firebase';
import { Redirect, useHistory } from "react-router-dom";
import Ticket from './Ticket';

//props = project component
function CreateTicket(props) {
    //     const
    // }
    {/*EDIT THIS OUT */ }
    // function CreateTicket() {
    const [tickets, setTickets] = useState(["Theres a bug on line 18", "Tomorrow    "]);
    const [ticketDescription, setTicketDescription] = useState("");

    const createTicket = (event) => {
        event.preventDefault();
        setTickets([...tickets, ticketDescription])
        setTicketDescription("");
    }


    console.log(tickets);
    let history = useHistory();
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


                <button type="submit" onClick={createTicket} on >
                    Create Ticket
            </button>
            </form>
        </div >
    );
}

export default CreateTicket;
