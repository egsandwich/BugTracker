import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link as LinkUI } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { grey, } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

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
    const classes = useStyles();
    console.log(props);
    return (
        <div>
            {/* <Card className={classes.root}>
                <Typography variant="h5" component="h1" className={classes.title} noWrap="true">
                    {props.description}
                </Typography>
            </Card> */}
            Ticket
        </div>
    )
}

export default Ticket
