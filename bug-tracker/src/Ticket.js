import React from 'react'

function Ticket(props) {
    console.log(props);
    return (
        <div>
            {props.description}
        </div>
    )
}

export default Ticket
