import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Box, Typography } from '@material-ui/core/';



function ChartStatus(props) {
    const [openCount, setOpenCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);
    //useref instead

    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketStatus === "Open")
        setOpenCount(temp.length)
    }, [props.tickets])

    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketStatus === "In progress")
        setInProgressCount(temp.length)
    }, [props.tickets])

    useEffect(() => {
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
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 15,
                        stepSize: 3
                    }
                }
            ]
        }
    }



    return (
        <Box>
            <Typography variant="h6">Tickets by status</Typography>
            <Bar data={data} options={options} />
        </Box>
    )
}

export default ChartStatus;
