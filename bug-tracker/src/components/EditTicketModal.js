// import React, {useState, useEffect, useContext} from 'react'
// import base from '../firebase'
// import firebase from 'firebase'
// import {useAuth} from '../contexts/AuthContext'
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Button from '@material-ui/core/Button';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Typography from '@material-ui/core/Typography';
// import {Grid, Box, Select, MenuItem} from '@material-ui/core/';

// function EditTicketModal(props) {
//     const db = base.firestore();
//     const {currentUser} = useContext(AuthContext);
//     const [ticketTitle, setTicketTitle] = useState("");
//     const [ticketDescription, setTicketDescription] = useState("");
//     const [ticketPriority, setTicketPriority] = useState("Low");
//     const [ticketStatus, setTicketStatus] = useState("Open");
//     const [ticketType, setTicketType] = useState("Bug/Error");
//     const docRef = db.collection('tickets').doc(props.ticketId);

//     useEffect(() => {
//         docRef.get().then(doc => {
//                 setTicketTitle(doc.data().ticketTitle)
//                 setTicketDescription(doc.data().ticketDescription)
//                 setTicketPriority(doc.data().ticketPriority)
//                 setTicketStatus(doc.data().ticketStatus)
//                 setTicketType(doc.data().ticketType)
//         }
            
//         )
//             // console.log(props)
//     }, [])

//     const edit = (event) => {
//         docRef.set({
//             ticketTitle: ticketTitle,
//             ticketDescription: ticketDescription,
//             ticketStatus: ticketStatus,
//             ticketType: ticketType,
//             ticketPriority: ticketPriority,
//             dateEdited: firebase.firestore.FieldValue.serverTimestamp(),
//             ticketEditor: currentUser.uid
//         }, {merge: true});
//     }
//     return props.status ? (
//         <div>
//                 <label>Title</label>
//                 <input placeholder={ticketTitle} type="text" onChange={(event) => setTicketTitle(event.target.value)} />
//                 <label> Description</label>
//                 <input type="text" placeholder={ticketDescription} onChange={(event) => setTicketDescription(event.target.value)} />
//                 <label>Type</label>
//                 <select value={ticketType} onChange={(event) => setTicketType(event.target.value)}>
//                     <option defaultValue="Bug/Error">Bug/Error</option>
//                     <option value="Request">Request</option>
//                 </select>
//                 <label>Status</label>
//                 <select value={ticketStatus} onChange={(event) => setTicketStatus(event.target.value)}>
//                     <option defaultValue="Open">Open</option>
//                     <option value="In progress">In progress</option>
//                     <option value="Resolved">Resolved</option>
//                 </select>
//                 <label>Priority</label>
//                 <select value={ticketPriority} onChange={(event) => setTicketPriority(event.target.value)}>
//                     <option defaultValue="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                 </select>
//                 <button type="submit" disabled={ticketTitle.length === 0 || ticketDescription.length === 0} onClick={edit}>
//                     Edit
//             </button>
//         </div>
//     ) : <div></div>
// }

// export default EditTicketModal
