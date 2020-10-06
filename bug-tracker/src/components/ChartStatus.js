import React, { useEffect, useState } from 'react'
import firebase from "./firebase";



function ChartStatus() {
    const [openCount, setOpenCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);
    const db = firebase.firestore();

    useEffect(() => {
        db.collection('_tickets').where("ticketStatus", "==", 'Open')
            .get()
            .then(snapshot => {

                setOpenCount(snapshot.size)
            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketStatus", "==", 'In progress')
            .get()
            .then(snapshot => {
                setInProgressCount(snapshot.size);


            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketStatus", "==", 'Resolved')
            .get()
            .then(snapshot => {
                setResolvedCount(snapshot.size)
            })
    }, [])

    return (
        <div>
            <p>Tickets by status</p>
            <p>Low : {openCount}</p>
            <p> Medium : {inProgressCount}</p>
            <p>High : {resolvedCount}</p>
        </div>
    )
}

export default ChartStatus;
