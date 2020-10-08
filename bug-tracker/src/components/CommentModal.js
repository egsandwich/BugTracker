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
            commenter: currentUser.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()

        }).then(() => {
            setComment("");
            props.history.push(`${props.projectId}/${props.ticketId}`)
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
            active is false
    </div>
}

export default withRouter(CommentModal)
