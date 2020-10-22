import React, { useState, useContext } from 'react'
import base from './firebase'
import { AuthContext } from './Auth'


function ticketCommentModal(props) {
    const [comment, setComment] = useState("");

    /**
     * structure of database:
     * database for ticket (connected to project via project id)
     * database for comments (connected to ticket via ticket id)
     * 
     */
    const createComment = (event) => {
        event.preventDefault();


    }
    return (
        <div>

        </div>
    )
}

export default ticketCommentModal
