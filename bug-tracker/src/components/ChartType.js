import React, { useEffect, useState } from 'react'
import {Doughnut} from 'react-chartjs-2';

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


    const chart = {
        labels: ['Error/Bug', 'Requests'],
            datasets: [
                {
                    label: 'Number of tickets',
                    data: [errorBugCount, requestCount],
                    backgroundColor: [
                        'rgb(255,165,0)', //orange
                        'rgb(0, 0, 255)', //blue
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
            <p>Tickets by type</p>
            <Doughnut data={chart} options={options}/>
        </div>
    )
}



export default ChartType
