import React, { useEffect, useState } from 'react'


function ChartStatus(props) {
    const [openCount, setOpenCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketStatus === "Open")
        setOpenCount(temp.length)
    }, [props.tickets])

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketStatus === "In progress")
        setInProgressCount(temp.length)
    }, [props.tickets])

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketStatus === "Resolved")
        setResolvedCount(temp.length)
    }, [props.tickets])

    // useEffect(() => {
    //     props.tickets.map(ticket => {
    //         console.log(ticket)
    //     })
    // }, [[props.tickets]])

   

    return (
        <div>
            <p>Tickets by status</p>
            <p>Open: {openCount}</p>
            <p>In progress: {inProgressCount}</p>
            <p>Resolved: {resolvedCount}</p>
        </div>
    )
}

export default ChartStatus;
