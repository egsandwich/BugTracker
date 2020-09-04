import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { grey, } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

const primary100 = grey["100"];
const fontPrimary = grey["900"];
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: primary100,
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        height: '4em',
    },
    title: {
        fontSize: 20,
    },
}));


// to remove underline on link: style={{ textDecoration: 'none' }}
export default function Preview(props) {
    const classes = useStyles();
    return (

        <Card className={classes.root} variant="outlined" raised="true">
            <Link to={`/projects/${props.id}`} style={{ textDecoration: 'none' }}>
                <CardContent>
                    <Typography variant="h5" component="h1" className={classes.title} noWrap="true">
                        {props.name}
                    </Typography>
                </CardContent>
            </Link>
        </Card>

    )
}
