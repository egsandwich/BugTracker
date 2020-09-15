import React, { useEffect, useState } from 'react'
import firebase from "./firebase";



function ChartPriority() {
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);

    useEffect(() => {
        firebase.db.collection('_tickets').where("ticketPriority", "==", 'High')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setHighCount(highCount + 1);

                }
                )
            })
    }, [])

    useEffect(() => {
        firebase.db.collection('_tickets').where("ticketPriority", "==", 'Medium')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setMediumCount(mediumCount + 1);

                }
                )
            })
    }, [])

    useEffect(() => {
        firebase.db.collection('_tickets').where("ticketPriority", "==", 'Low')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setLowCount(lowCount + 1);

                }
                )
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
