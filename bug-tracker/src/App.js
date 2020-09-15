import React, { useState, useEffect } from "react";
import "./App.css";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateProject from "./components/CreateProject";
import CreateTicket from "./components/CreateTicket";
import Dashboard from "./components/Dashboard";
import Drawer from "./components/Drawer";
import Project from "./components/Project";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import {
  makeStyles, xToolbar, Typography, Grid, List,
  ListItem, ListItemIcon, ListItemText, Link as LinkUI, Container, useTheme, IconButton
} from '@material-ui/core/';
// import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home'; //change to home icon
// import AddIcon from '@material-ui/icons/Add'; //change to something else icon
import { AddCircleOutlinedIcon as AddIcon } from '@material-ui/icons/AddCircleOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import firebase from './components/firebase'
// ---------------------------------------------------------

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    // width: '100%',
    // height: '100%',
    display: 'flex',
  },
  appbar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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


function App() {
  //in use effect for the future, check if logged in

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  },
    []); //run code in a condition in react
  //UI


  const classes = useStyles();
  const theme = useTheme();

  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  return firebaseInitialized !== false ? (
    <Router>
      <CssBaseline /> {/*removes default padding */}
      {/* if logged in show dashboard */}
      <NavBar />
      <Switch>
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route path="/projects/:projectId" component={Project} />
        <Route path="/tickets/:projectId" component={Project} />
        <Route path="/login" component={Login} />
        <Route path="/registerProject" component={CreateProject} />
        <Route path="/:projectId/registerTicket" component={CreateTicket} />
        <Route path="/" component={Dashboard} />
        <Route path="/" render={() => <div><h1>404</h1></div>} />
      </Switch>
      {/* bottom nav */}
      {/* CssBaseline? */}
      {/* <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2">  {'Copyright © '} </Typography>
          </Container>
        </footer> */}
    </Router >
  ) : <div>Loading</div>
}

export default App;
