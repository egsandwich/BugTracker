import React from "react";
import "./App.css";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateProject from "./components/CreateProject";
import CreateTicket from "./components/CreateTicket";
import Dashboard from "./components/Dashboard";
import Project from "./components/Project";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import base from './firebase'
import {
  makeStyles, xToolbar, Typography, Grid, List,
  ListItem, ListItemIcon, ListItemText, Link as LinkUI, Container, useTheme, IconButton
} from '@material-ui/core/';
// import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home'; //change to home icon
// import AddIcon from '@material-ui/icons/Add'; //change to something else icon
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import Ticket from "./components/Ticket";
// ---------------------------------------------------------




function App() {

  //fix private route

  return (
    <Router>
      <AuthProvider>
        <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route path ="/signup" component={Signup}/>
            <Route path ="/login" component={Login}/>
            <PrivateRoute path="/addProject" component={CreateProject} /> 
            <PrivateRoute path="/myProjects" component={ProjectList} />
          </Switch>
        </AuthProvider>
    </Router>


    //     <CssBaseline /> {/*removes default padding */}
    //     <NavBar />
    //       <Route path="/contact" component={Contact} />
    //       <Route path="/detail/:projectId" component={Project} />
    //       <PrivateRoute path="/:projectId/addTicket" component={CreateTicket} />
    //       <PrivateRoute path="/tickets/:projectId/:ticketId" component={Ticket} />
    //       <PrivateRoute path="/myProfile/" component={Profile} />
    //       <Route path="/login" component={Login} />
    //       <PrivateRoute path="/" component={Dashboard} />
          /* <Route path="/" render={() => <div><h1>404</h1></div>} /> 
        // </Switch>
        // <Footer/>
        /* <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2">  {'Copyright © '} </Typography>
          </Container>
        </footer> */
      // </Router >
  )
}

export default App; 
