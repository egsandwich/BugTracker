import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkUI, Typography, Box, Grid, Card, CardContent, CardActionArea, CardActions, Button, Paper} from '@material-ui/core/';
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
            
    }, [db.collection('comments')])

    useEffect(() => {
      console.log(comments)
    },[])


    const addCommentHandler = () => {
        setActive(!active)
    }

    const editTicketHandler = () => {
         setEditActivate(!editActivate)
    }
    const classes = useStyles();

    //useEffect get details 
    return (
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography variant="h4">Details</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                    <Card>
                        <CardContent>
                        <Typography variant="overline">Title:</Typography>
                        <Typography variant="h6"> {ticketTitle} </Typography>
                        <Typography variant="overline"> Creator: </Typography>
                        <Typography>{ticketCreator} </Typography>
                        <Typography variant="overline"> Description: </Typography>
                        <Typography>{ticketDescription}</Typography>
                        <Typography variant="overline"> Priority: </Typography>
                        <Typography> {ticketPriority} </Typography>
                        <Typography variant="overline"> Status: </Typography>
                        <Typography>{ticketStatus} </Typography>
                        <Typography variant="overline"> Type: </Typography>
                        <Typography>{ticketType} </Typography>
                        <CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" hidden={editActivate} onClick={editTicketHandler}>
                                    {editActivate ? 'Close' : 'Edit'}
                                </Button>
                                <Button onClick={addCommentHandler} size="small" color="primary" hidden={active}>
                                    {active ? 'Close' : 'Add comment'}
                                </Button>
                            </CardActions>
                        </CardActionArea>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={3}> 
                        <Typography variant="subtitle1">Comments</Typography>
                    <Card>
                        {comments.map(comment => (
                            <Comment key={comment.commentId} comment={comment}>
                                <p>{comment.comment} </p>
                                </Comment>
                        ))}
                    </Card>
                    </Grid>
                    <Grid container item>
                    
                    <CommentModal status={active} ticketId={params.ticketId} projectId={params.projectId} />
                    
                    <EditTicketModal status={editActivate} ticketId={params.ticketId}/>
                    </Grid>
                </Grid>
            </Box>
    )
}

function Comment(props){
    const {comment, commentId, commenterName, dateCreated} = props.comment;
    const [dateConvert, setDateConvert] = useState();

    useEffect(() => {
        setDateConvert(dateCreated.seconds * 1000)
    }, [dateCreated!= null])
    return (
        <Paper variant="outlined" square>
        <CardContent>
            <Typography variant="subtitle2">
                {commenterName}:
            </Typography>
            <Typography variant="body1">
            {comment}
            </Typography>
            <Typography variant="caption">
            {new Date(dateConvert).toLocaleDateString('no-NO')}
            </Typography>
        </CardContent>
        </Paper>
    );
}

export default withRouter(Ticket)
