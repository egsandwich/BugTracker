import React from 'react'
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
    }
}))
function Drawer(props) {

    const { history } = props;
    const itemsList = [{
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push('/')
    }]
    const classes = useStyles();
    return (
        <MUIDrawer variant="permanent" className={classes.drawer}>

            <List>
                {/* <Link to="/registerProject"> */}
                {/* <ListItem button>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem> */}
                {/* </Link> */}
                {itemsList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text}></ListItemText>
                        </ListItem>
                    )
                })}
            </List>

        </MUIDrawer>
    );
}

export default withRouter(Drawer);
