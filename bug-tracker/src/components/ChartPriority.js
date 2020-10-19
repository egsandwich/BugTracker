import React, { useEffect, useState } from 'react'
import base from "./firebase";
import firebase from 'firebase'


function ChartPriority(props) {
    const db = base.firestore();
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);


    useEffect(()=>{
        const tempLow = props.tickets.filter(ticket => ticket.ticketPriority == "Low")
        setLowCount(tempLow.length)
    }, [props.tickets])


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
