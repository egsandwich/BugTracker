import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';


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

    const chart =  {
       
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
                    borderWidth : 1
                }
            ]
       
 }

 const options = {
     responsive: true,
     yAxes : [
         {
             ticks: {
                 autoSkip: true,
                 beginAtZero: true
             }, 
             gridLines: {
                 drawBorder: true,
                 display: false
             }
         }
     ],
     xAxes: [
         {
             gridLines: {
                 display: false
             }
         }
     ]
 }


    return (
        <div>
            <h1>Tickets by priority</h1>
            <div>
                <Bar data={chart} options={options}/>
            </div>
          
        </div>
    )
}

export default ChartPriority;

