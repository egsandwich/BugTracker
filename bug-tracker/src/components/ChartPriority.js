import React, { useEffect, useState } from 'react'
import firebase from "./firebase";



function ChartPriority() {
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);
    const db = firebase.firestore();

    useEffect(() => {
        db.collection('_tickets').where("ticketPriority", "==", 'High')
            .get()
            .then(snapshot => {

                setHighCount(snapshot.size)
            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketPriority", "==", 'Medium')
            .get()
            .then(snapshot => {
                setMediumCount(snapshot.size);


            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketPriority", "==", 'Low')
            .get()
            .then(snapshot => {
                setLowCount(snapshot.size)
            })
    }, [])

    return (
        <div>
            <p>Tickets by priority</p>
            <p>Low : {lowCount}</p>
            <p> Medium : {mediumCount}</p>
            <p>High : {highCount}</p>
        </div>
    )
}

export default ChartPriority;
