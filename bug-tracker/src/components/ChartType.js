import React from 'react'

function ChartType() {
    const [errorBugCount, setErrorBugCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        db.collection('_tickets').where("ticketType", "==", 'High')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setHighCount(highCount + 1);

                }
                )
            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketPriority", "==", 'Medium')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setMediumCount(mediumCount + 1);

                }
                )
            })
    }, [])

    useEffect(() => {
        db.collection('_tickets').where("ticketPriority", "==", 'Low')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    setLowCount(lowCount + 1);

                }
                )
            })
    }, [])

    return (
        <div>
            <p>Tickets by priority</p>
            <p>Low : {lowCount}</p>
            <p> Medium : {mediumCount}</p>
            <p>High : {highCount}</p>
        </div>
    )
}
return (
    <div>

    </div>
)
}

export default ChartType
