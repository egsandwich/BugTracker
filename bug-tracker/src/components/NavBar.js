import React, { useState } from 'react'
import {
    AppBar, Toolbar, Typography, ListItem, IconButton, ListItemText, Avatar, Divider
    , List, Box, ListItemIcon, Drawer as MobileMenu
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { Link } from 'react-router-dom'

//CSS styles
const useStyles = makeStyles(theme => ({
    appBar: {

    },
    homeIcon: {
        color: "#FFFFFF", //white

    },
    title: {
        color: "#FFFFFF", //white
    },
    menuSliderContainer: {
        width: 240,
        background: "#7986cb",
        height: "100%"
    },
    icon: {
        color: "#FFFFFF", //white
    }
}))

const menuItems = [
    {
        listIcon: <HomeOutlinedIcon />,
        listText: "Home",
        listPath: "/"
    },
    {
        listIcon: <AddBoxOutlinedIcon />,
        listText: "Add project",
        listPath: "/registerProject"
    },
    {
        listIcon: <SettingsOutlinedIcon />,
        listText: "Profile",
        listPath: "/"
    },
    {
        listIcon: <ContactSupportOutlinedIcon />,
        listText: "Contact us",
        listPath: "/contact"
    },
]
function NavBar() {
    const [state, setState] = useState({
        left: false
    });
    const toggleMenu = (slider, open) => () => {
        setState({ ...state, [slider]: open });
    }
    const classes = useStyles();
    const sideList = slider => (
        < Box component="div" className={classes.menuSliderContainer} onClick={toggleMenu("left", false)}>
            <List>
                {menuItems.map((lsItem, key) => (
                    <ListItem button key={key} component={Link} to={lsItem.listPath}>
                        <ListItemIcon className={classes.icon}>
                            {lsItem.listIcon}
                        </ListItemIcon>
                        <ListItemText primary={lsItem.listText} className={classes.icon} />
                    </ListItem>
                ))}
            </List>
        </Box >
    )
    return (
        <>

            <Box component="nav">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={toggleMenu("left", true)}>
                            <MenuOutlinedIcon className={classes.homeIcon} />
                        </IconButton>
                        <Typography variant="h5" className={classes.title} >
                            {/* <Link to="/" style={{ textDecoration: 'none' }} > */}
                            {/* <LinkUI underline='none'> */}
                            Bug Tracker
          {/* </LinkUI> */}
                            {/* </Link> */}
                        </Typography>
                        <MobileMenu open={state.left} onClose={toggleMenu("left", false)}>
                            {sideList("left")}
                        </MobileMenu>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavBar;