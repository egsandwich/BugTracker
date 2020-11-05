import React, { useState, useContext } from 'react'
import base from './firebase'
import { AuthContext } from './Auth'
import { withRouter} from 'react-router-dom'
import {Dialog, FormControl, Input, InputLabel, Button, Paper} from '@material-ui/core/';

import firebase from 'firebase'

function CommentModal(props) {
    const [comment, setComment] = useState(" ");
    const { currentUser } = useContext(AuthContext);
    const db = base.firestore();
    const [open, setOpen] = useState(props.status)

    const addComment = (event) => {
            try{
            document.getElementById("submitButton").disabled = true;
            db.collection("comments").add({
            comment: comment,
            ticket: props.ticketId,
            commenterId: currentUser.uid,
            commenterName: currentUser.displayName,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            setComment(" ");
            props.history.push(`/tickets/${props.projectId}/${props.ticketId}`)
        }
        )
    }
    catch(error){
        setComment(" ");
        alert("Something went wrong. Please try again.")
        props.history.push(`/tickets/${props.projectId}/${props.ticketId}`)
    }
    }

    const closeDialog = () => {
        setOpen(!open)
    }

    return  (
        <div>
            <form>
                <FormControl>
                    <InputLabel>Comment</InputLabel>
                    <Input id="onInput" value={comment} onChange={(event) => {
                        setComment(event.target.value);}
                        } />
                    <Button id="submitButton" variant="contained" size="small" type="submit" disabled={comment.length == 0} onClick={addComment}>Add comment</Button>
                </FormControl>
            </form>
        </div> 
    )
}

export default withRouter(CommentModal)
