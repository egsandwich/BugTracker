import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import CopyrightIcon from '@material-ui/icons/Copyright'

function Footer() {
    return (
        <Paper>
            <Tabs centered>
                <Tab icon={<CopyrightIcon fontSize="small" />} disabled label="Copyright 2020" />

                {/* <Tab icon={<GitHubIcon fontSize="small" />} label="Github"
                    containerElement= /> */}

            </Tabs>
        </Paper>
    )
}

export default Footer
