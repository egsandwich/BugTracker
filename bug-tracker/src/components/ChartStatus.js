import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'


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

    const data = {
        labels: ['Open', 'In progress', 'Resolved'],
            datasets: [
                {
                    label: 'Number of tickets',
                    data: [openCount, inProgressCount, resolvedCount],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)', 
                    ], 
                    borderWidth : 1
                }
            ]
    }

    const options = {
        responsive: true
    }

   

    return (
        <div>
            <p>Tickets by status</p>
            <Bar data={data} options={options}/>
        </div>
    )
}

export default ChartStatus;
