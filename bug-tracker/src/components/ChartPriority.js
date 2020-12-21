import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@material-ui/core/';



function ChartPriority(props) {
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);



    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "Low")
        const temp2 = temp.filter(ticket => ticket.ticketStatus != "Resolved")
        setLowCount(temp2.length)
    }, [props.tickets])

    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "Medium")
        const temp2 = temp.filter(ticket => ticket.ticketStatus != "Resolved")
        setMediumCount(temp2.length)

    }, [props.tickets])
    useEffect(() => {
        const temp = props.tickets.filter(ticket => ticket.ticketPriority === "High")
        const temp2 = temp.filter(ticket => ticket.ticketStatus != "Resolved")
        setHighCount(temp2.length)
    }, [props.tickets])

    const chart = {

        labels: ['Low', 'Medium', 'High'],
        datasets: [
            {
                label: 'Number of tickets',
                data: [lowCount, mediumCount, highCount],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
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
            <Typography variant="h6">Tickets by priority</Typography>
            <Bar data={chart} options={options} />
        </Box>
    )
}

export default ChartPriority;

