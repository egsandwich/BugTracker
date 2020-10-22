import React, { useEffect, useState } from 'react'

function ChartType(props) {

    const [errorBugCount, setErrorBugCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketType === "Bug/Error")
        setErrorBugCount(temp.length)
    }, [props.tickets])

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketType === "Request")
        setRequestCount(temp.length)
    }, [props.tickets])



    return (
        <div>
            <p>Tickets by type</p>
            <p>Bug/Error : {errorBugCount}</p>
            <p> Request : {requestCount}</p>
        </div>
    )
}



export default ChartType
