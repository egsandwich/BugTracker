import React, { useState } from "react";
import db from "./firebase";
import firebase from 'firebase';
import { Redirect } from "react-router-dom";

{/*EDIT THIS OUT */ }
function CreateTicket() {
    const [tickets, setTickets] = useState(["Theres a bug on line 18", "Tomorrow    "]);
    const [ticketDescription, setTicketDescription] = useState("");

    const createTicket = (event) => {
        event.preventDefault();
        setTickets([...tickets, ticketDescription])
        setTicketDescription("");
    }


    console.log(tickets);
    return (
        <div>
            <form>
                <p>
                    <input
                        value={ticketDescription}
                        onChange={(event) => setTicketDescription(event.target.value)}
                    />
                </p>


                <button type="submit" onClick={createTicket}>
                    Create Ticket
        </button>
            </form>

            {tickets.map((ticket) =>
                <p>{ticket}</p>
            )}
        </div>
    );
}

export default CreateTicket;
