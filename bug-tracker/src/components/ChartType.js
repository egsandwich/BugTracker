import React, { useEffect, useState } from 'react'
import base from './firebase'

const db = base.firestore()
function ChartType() {
    const [errorBugCount, setErrorBugCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);


    useEffect(() => {
        db.collection('_tickets').where("ticketType", "==", 'Bug/Error')
            .get()
            .then(snapshot => {

                setErrorBugCount(snapshot.size)
            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketType", "==", 'Request')
            .get()
            .then(snapshot => {
                setRequestCount(snapshot.size);


            })
    }, [])


    return (
        <div>
            <p>Tickets by type</p>
            <p>Bug/Error : {errorBugCount}</p>
            <p> Request : {requestCount}</p>
        </div>
    )
}



export default ChartType
