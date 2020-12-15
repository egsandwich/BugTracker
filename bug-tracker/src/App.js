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
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import Ticket from "./components/Ticket";
import { CssBaseline } from '@material-ui/core'
import EditModal from "./components/EditModal";
// ---------------------------------------------------------




function App() {

  //fix private route

  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <NavBar />
        <Switch>

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/contact" component={Contact} />
          <PrivateRoute path="/addProject" component={CreateProject} />
          <PrivateRoute path="/myProjects" component={ProjectList} />
          <PrivateRoute path="/detail/:projectId" component={Project} />
          <PrivateRoute path="/:projectId/addTicket" component={CreateTicket} />
          <PrivateRoute path="/myProfile" component={Profile} />
          <PrivateRoute path="/updateProfile" component={EditModal} />
          <PrivateRoute path="/tickets/:projectId/:ticketId" component={Ticket} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>


    //     <CssBaseline /> {/*removes default padding */}

    // </Switch>
    /* <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2">  {'Copyright © '} </Typography>
      </Container>
    </footer> */
    // </Router >
  )
}

export default App; 
