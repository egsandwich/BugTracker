import React,  { useState} from 'react'
import {
    AppBar, Toolbar, Typography, ListItem, IconButton, ListItemText, Avatar, Divider
    , List, Box, ListItemIcon, Drawer as MobileMenu, MenuItem, Button
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { Link, withRouter} from 'react-router-dom'
import base from './firebase'

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
        background: "#3f51b5",
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
        listIcon: <ListAltOutlinedIcon />,
        listText: "My projects",
        listPath: "/myProjects"
    },
    {
        listIcon: <AddBoxOutlinedIcon />,
        listText: "Add project",
        listPath: "/addProject"
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
function NavBar(props) {
    const [state, setState] = useState({
        left: false
    });

    const toggleMenu = (slider, open) => () => {
        setState({ ...state, [slider]: open });
    }

    const handleLogout = () => {
        base.auth().signOut().then(
            props.history.push('/')
        )
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
            <MenuItem onClick={handleLogout}>
                <ListItemIcon className={classes.icon}>
                    <ExitToAppOutlinedIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText className={classes.icon} primary="Log out" />
            </MenuItem>
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

export default withRouter(NavBar);