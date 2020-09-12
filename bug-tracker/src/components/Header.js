import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

//put margin? padding?
const useStyles = makeStyles(theme => ({
    margins: {
        marginLeft: "20px",
        marginTop: "8px"
    }
}))
function Header() {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant="h5" className={classes.margins}>
                Dashboard
            </Typography>

        </Box>
    )
}

export default Header
