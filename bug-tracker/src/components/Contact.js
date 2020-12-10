import React from "react";
import { Link, Redirect } from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub'
import { Box, Typography, IconButton } from '@material-ui/core';


function Contact() {

    const goToGit = () => {
        window.open("https://github.com/egsandwich/BugTracker")
    }

    return (
        <Box m={3}>
            <Typography variant="h5">
                Contact us
            </Typography>
            <Typography variant="h6">
                If you find any bugs, please report it
            </Typography>
            <Box>
                <IconButton onClick={goToGit}>
                    <GitHubIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Contact;
