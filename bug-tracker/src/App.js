import React from "react";
import "./App.css";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateProject from "./components/CreateProject";
import CreateTicket from "./components/CreateTicket";
import Dashboard from "./components/Dashboard";
import Project from "./components/Project";
import {
  makeStyles, AppBar, Toolbar, Typography, Grid, Drawer, List,
  ListItem, ListItemIcon, ListItemText, Link as LinkUI, Container
} from '@material-ui/core/';
// import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home'; //change to home icon
// import AddIcon from '@material-ui/icons/Add'; //change to something else icon
import { AddCircleOutlinedIcon as AddIcon } from '@material-ui/icons/AddCircleOutlined';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  list: {
    width: 200,
  },
  gridList: {
    height: '90%',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1
  },
  grid: {
    width: '100%',
    height: '10%'
  },
  linkStyle: {
    color: 'white',
  },
  footer: {
    padding: theme.spacing(3, 2),
    margintTop: 'auto',

  },

}));

//dashboard
//more views i guess
function App() {
  //in use effect for the future, check if logged in

  //useEffect(() => {}, [
  //put condition here
  //]); //run code in a condition in react
  //UI


  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = (
    <Grid className={classes.gridList}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >


        <List>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/registerProject" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add project" />
            </ListItem>
          </Link>
        </List>
      </div>
    </Grid>
  );



  return (
    <Router>
      <div className={classes.root}>
        <Grid className={classes.grid}>
          <AppBar position="static">
            <Toolbar>
              <MenuIcon onClick={toggleDrawer(true)} />
              <Typography variant="h3" className={classes.title}>
                <Link to="/" style={{ textDecoration: 'none' }} >
                  <LinkUI className={classes.linkStyle} underline='none'>
                    Bug Tracker
              </LinkUI>
                </Link>
              </Typography>

            </Toolbar>
          </AppBar>
        </Grid>


        <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>{list}</Drawer>
        {/* <Drawer anchor='left' variant='permanent'>{list}</Drawer> */}

        {/* if logged in show dashboard */}
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/projects/:projectId" component={Project} />
          <Route path="/tickets/:projectId" component={Project} />
          <Route path="/login" component={Login} />
          <Route path="/registerProject" component={CreateProject} />
          <Route path="/:projectId/registerTicket" component={CreateTicket} />
          <Route path="/" component={Dashboard} />
          <Route path="/" render={() => <div><h1>404</h1></div>} />
        </Switch>
        {/* bottom nav */}
        {/* <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2">  {'Copyright © '} </Typography>
          </Container>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
