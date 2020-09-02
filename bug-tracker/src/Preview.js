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
        width: 170,
        height: 70,
        marginTop: 30,
        marginBottom: 12,
        backgroundColor: primary100,
        color: fontPrimary,
        alignContent: 'center',
    },
    title: {
        fontSize: 14,
    },
    cardProp: {
        padding: theme.spacing(2),
    }
}));


// to remove underline on link: style={{ textDecoration: 'none' }}
export default function Preview(props) {
    const classes = useStyles();
    return (
        <Grid container justify="center" spacing={3}>

            <Card className={classes.root} variant="outlined" raised="true">
                <Link to={`/projects/${props.id}`} style={{ textDecoration: 'none' }}>
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            {props.name}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        </Grid>

    )
}
