import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Box, Grid, Card, CardContent, CardActionArea, CardActions, Button, Paper,
    Collapse, IconButton, ListItemText} from '@material-ui/core/';
import { grey, } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withRouter, useParams, Link } from "react-router-dom";
import base from './firebase'
import firebase from 'firebase'
import CommentModal from './CommentModal'
import EditTicketModal from './EditTicketModal';
const useStyles = makeStyles((theme) => ({
  ticketCard : {
      maxWidth: "350px",
  },
  commentCard: {
      maxWidth: "350px",
  }
}));

function Ticket(props) {
    const db = base.firestore();
    const [ticketTitle, setTicketTitle] = useState("");
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

    return (
            <Box padding={2}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={2} sm={1}>
                    <IconButton component={Link} to={`/detail/${params.projectId}/${params.ticketId}`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    </Grid>
                    <Grid item xs={9} sm={9} lg={12} xl={12}>
                    <Typography variant="h4">Details</Typography>
                    </Grid>
                </Grid>
                    <Grid container item alignItems="center" justify="space-evenly">
                    <Grid item xs={12} sm={12} md={6}>
                    <Card className={classes.ticketCard}>
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
                        </CardContent>
                        <CardActionArea>
                            <CardActions>
                                <IconButton onClick={addCommentHandler}>
                                <ListItemText primary="Add comment"> 
                                <ExpandMoreIcon/>
                                </ListItemText>
                                </IconButton>
                                <IconButton onClick={editTicketHandler}>
                                <ExpandMoreIcon/>
                                </IconButton>
                            </CardActions>
                        </CardActionArea>
                        <Collapse in={active} timeout="auto" unmountOnExit>
                            <CardContent>
                            <CommentModal status={active} ticketId={params.ticketId} projectId={params.projectId} />
                            {/* Put add comment here? */}
                            </CardContent>
                        </Collapse>
                        <Collapse in={editActivate} timeout="auto" unmountOnExit>
                            <CardContent>
                            {/* <CommentModal status={active} ticketId={params.ticketId} projectId={params.projectId} /> */}
                            {/* Edit */}
                            <EditTicketModal status={editActivate} ticketId={params.ticketId}/>
                            {/* Put add comment here? */}
                            </CardContent>
                        </Collapse>
                    </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}> 
                        <Typography variant="subtitle1">Comments</Typography>
                    <Card className={classes.ticketCard}>
                        {comments.map(comment => (
                            <Comment key={comment.commentId} comment={comment}>
                                <p>{comment.comment} </p>
                                </Comment>
                        ))}
                    </Card>
                    </Grid>
                </Grid>
            </Box>
    )
}

function Comment(props){
    const {comment, commentId, commenterName, dateCreated} = props.comment;
    const [dateConvert, setDateConvert] = useState();

    useEffect(() => {
        if(dateCreated == null){
            var date = new Date();
            setDateConvert(date.toLocaleDateString('no-NO')+ ", " + date.toLocaleTimeString('no-NO'))
            console.log(dateConvert)
        } else {
            setDateConvert(dateCreated.toDate().toLocaleDateString('no-NO') + ", " + dateCreated.toDate().toLocaleTimeString('no-NO'))
            console.log(dateConvert + " else")
        }
    }, [dateCreated != null])
    
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
            {dateConvert}
            </Typography>
        </CardContent>
        </Paper>
    );
}

export default withRouter(Ticket)
