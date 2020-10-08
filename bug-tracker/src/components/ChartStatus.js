import React, { useEffect, useState } from 'react'
import base from "./firebase";



const db = base.firestore();
function ChartStatus() {
    const [openCount, setOpenCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);

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
    }, [
        //db here?
    ])

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
