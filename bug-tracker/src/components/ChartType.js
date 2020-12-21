import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@material-ui/core/';


function ChartType(props) {

    const [errorBugCount, setErrorBugCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketType === "Bug/Error")
        const temp2 = temp.filter(ticket => ticket.ticketStatus != "Resolved")
        setErrorBugCount(temp2.length)
    }, [props.tickets])

    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketType === "Request")
        const temp2 = temp.filter(ticket => ticket.ticketStatus != "Resolved")
        setRequestCount(temp2.length)
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
                borderWidth: 1
            }
        ]

    }

    const options = {
        responsive: true
    }


    return (
        <Box>
            <Typography variant="h6">Tickets by type</Typography>
            <Doughnut data={chart} options={options} />
        </Box>
    )
}



export default ChartType
