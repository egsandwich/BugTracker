import React, { useState, useEffect } from "react";
import { useParam, useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import Ticket from './Ticket'

// delete?
function TicketList(props) {
    const [tickets, setTickets] = useState([]);

    const param = useParams();

    useEffect(() => {
        db.collection("projects").where(firebase.firestore.FieldPath.documentId(), '==', param.projectId)
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

    return (
        <div>

            {/* pass in an object */}
            {tickets.map((ticket) => (
                <Ticket description={ticket.ticketDescription} />

            ))
            }

            {/*
        should have a delete button, add comment button
        */}

        </div>
    );
}

export default TicketList;
