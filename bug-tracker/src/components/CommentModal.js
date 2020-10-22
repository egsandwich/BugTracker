import React, { useState, useContext } from 'react'
import base from './firebase'
import { AuthContext } from './Auth'
import { withRouter, Redirect } from 'react-router-dom'
import firebase from 'firebase'

function CommentModal(props) {
    const [comment, setComment] = useState("");
    // const [commenter, setCommenter] = useState("")
    const { currentUser } = useContext(AuthContext);

    const addComment = (event) => {
        base.firestore().collection("comments").add({
            comment: comment,
            ticket: props.ticketId, 
            commenterId: currentUser.uid,
            commenterName: currentUser.displayName,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()

        }).then(() => {
            setComment("");
            props.history.push(`/tickets/${props.projectId}/${props.ticketId}`)
        }
        )
    }

    return props.status ? (
        <div>
            <form>
                <label>Comment</label>
                <input value={comment} onChange={(event) => setComment(event.target.value)} />
                <button onClick={addComment}>Add comment</button>
            </form>
        </div>
    ) : <div>
    </div>
}

export default withRouter(CommentModal)
