import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        width: 275,
        marginBottom: 12,
        marginLeft: 12,

    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

// to remove underline on link: style={{ textDecoration: 'none' }}
export default function Preview(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined" raised="true">
            <CardContent>
                <Typography variant="h5" component="h1">
                    {props.name}
                </Typography>
            </CardContent>
        </Card>

    )
}
