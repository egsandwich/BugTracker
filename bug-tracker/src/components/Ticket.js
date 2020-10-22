import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link as LinkUI } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { grey, } from '@material-ui/core/colors';
import { Link, withRouter, useParams } from "react-router-dom";
import base from './firebase'
import firebase from 'firebase'
import CommentModal from './CommentModal'
import EditTicketModal from './EditTicketModal';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        height: '4em',
        // color: theme.palette.primary.main
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
}));

function Ticket(props) {
    const db = base.firestore();
    const [ticketTitle, setTicketTitle] = useState("");
    // const [ticketId, setTicketId] = useState("");
    const [ticketCreator, setTicketCreator] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [ticketPriority, setTicketPriority] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [ticketType, setTicketType] = useState("");
    const [active, setActive] = useState(false);
    const [comments, setComments] = useState([])
    const [editActivate, setEditActivate] = useState(false);

    const params = useParams();

    useEffect(() => {
        db.collection('tickets').where(firebase.firestore.FieldPath.documentId(), "==", params.ticketId)
            .onSnapshot(snapshot => snapshot.docs.forEach(doc => {
                setTicketTitle(doc.data().ticketTitle)
                setTicketDescription(doc.data().ticketDescription)
                setTicketPriority(doc.data().ticketPriority)
                setTicketStatus(doc.data().ticketStatus)
                setTicketType(doc.data().ticketType)
                db.collection("users").where(firebase.firestore.FieldPath.documentId(), "==", doc.data().ticketCreator)
                    .onSnapshot(snapshot => {snapshot.docs.map(doc => {
                        setTicketCreator(doc.data().firstName + " " + doc.data().lastName)
                    })})
            }))
    }, [db.collection('tickets').doc(params.ticketId)])

    useEffect(() => {
        db.collection('comments').where("ticket", "==", params.ticketId)
        .onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                commentId: doc.id,
                comment: doc.data().comment,
                commenterName: doc.data().commenterName,
                dateCreated: doc.data().dateCreated,
            })))
        })
    }, [db.collection('comments').where("ticket", "==", params.ticketId)])


    const addCommentHandler = () => {
        setActive(!active)
    }

    const editTicketHandler = () => {
         setEditActivate(!editActivate)
    }
    const classes = useStyles();

    //useEffect get details 
    return (
        <div>
            {/* <Card className={classes.root}>
                <Typography variant="h5" component="h1" className={classes.title} noWrap="true">
                    {props.description}
                </Typography>
            </Card> */}
            <p>{ticketTitle}</p>
            <p>{ticketCreator} </p>
            <p>{ticketDescription}</p>
            <p>{ticketPriority} </p>
            <p>{ticketStatus} </p>
            <p>{ticketType} </p>
                {comments.map(comment => (
                    <div key={comment.commentId}>
                        <p>{comment.comment} </p>
                        </div>
                ))}
            <button onClick={addCommentHandler}>Add comment</button>
            <CommentModal status={active} key={params.ticketId} ticketId={params.ticketId} projectId={params.projectId} />
            <button hidden={editActivate} onClick={editTicketHandler}>Edit</button>
            <EditTicketModal status={editActivate} ticketId={params.ticketId}/>
        </div>
    )
}

export default withRouter(Ticket)
