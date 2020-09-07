import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link as LinkUI } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { grey, } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

const primary100 = grey["100"];
const fontPrimary = grey["900"];
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


// to remove underline on link: style={{ textDecoration: 'none' }}
export default function Preview(props) {
    const classes = useStyles();
    return (
        <LinkUI underline='none'>
            <Link to={`/projects/${props.id}`} style={{ textDecoration: 'none' }}>
                <Card className={classes.root} variant="outlined" raised="true">
                    <CardContent>
                        <Typography variant="h5" component="h1" className={classes.title} noWrap="true">
                            {props.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </LinkUI>

    )
}
