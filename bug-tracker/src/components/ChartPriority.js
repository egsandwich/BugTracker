import React, { useEffect, useState } from 'react'


function ChartPriority(props) {
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);


    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "Low")
        setLowCount(temp.length)
    }, [props.tickets])

    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "Medium")
        setMediumCount(temp.length)

    }, [props.tickets])
    useEffect(()=>{
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "High")
        setHighCount(temp.length)
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
