// import React, { useState, useContext } from 'react'
// import base from '../firebase'
// import { useAuth } from '../contexts/AuthContext'
// import { withRouter} from 'react-router-dom'
// import {Dialog, FormControl, Input, InputLabel, Button, Paper} from '@material-ui/core/';
// import firebase from 'firebase'

// function CommentModal(props) {
//     const [comment, setComment] = useState(" ");
//     // const { currentUser } = useContext(AuthContext);
//     const db = base.firestore();
//     const [open, setOpen] = useState(props.status)

//     const addComment = (event) => {
//         event.preventDefault();
//         try{
//             db.collection("comments").add({
//             comment: comment,
//             ticket: props.ticketId,
//             commenterId: currentUser.uid,
//             commenterName: currentUser.displayName,
//             dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
//         }).then(() => {
//             setComment(" ");
//             props.history.push(`/tickets/${props.projectId}/${props.ticketId}`)
//         }
//         )
//     }
//     catch(error){
//         setComment(" ");
//         alert("Something went wrong. Please try again.")
//         props.history.push(`/tickets/${props.projectId}/${props.ticketId}`)
//     }
//     }

//     const closeDialog = () => {
//         setOpen(!open)
//     }

//     return  (
//         <div>
//             <form onSubmit={addComment}>
//                 <FormControl>
//                     <InputLabel>Comment</InputLabel>
//                     <Input id="onInput" value={comment} onChange={(event) => {
//                         setComment(event.target.value);}
//                         } />
//                     <Button variant="contained" size="small" type="submit" disabled={comment.length == 0}>Add comment</Button>
//                 </FormControl>
//             </form>
//         </div> 
//     )
// }

// export default withRouter(CommentModal)
