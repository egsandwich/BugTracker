import React from "react";
import "./App.css";

import Contact from "./Contact";
import Login from "./Login";
import Dasboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateProject from "./CreateProject";
import CreateTicket from "./CreateTicket";
import Dashboard from "./Dashboard";
import Project from "./Project";
import Ticket from "./Ticket";

//dashboard
//more views i guess
function App() {
  //in use effect for the future, check if logged in

  //useEffect(() => {}, [
  //put condition here
  //]); //run code in a condition in react


  return (
    <Router>
      <div className="App">
        <nav>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/registerProject">Create</Link>
            </li>
          </ul>

        </nav>

        {/* if logged in show dashboard */}
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/project/:" component={Project} />
          <Route path="/login" component={Login} />
          <Route path="/registerProject" component={CreateProject} />
          <Route path="/registerTicket" component={CreateTicket} />
          <Route path="/tickets" component={Ticket} />
          <Route path="/" component={Dashboard} />
          <Route path="/" render={() => <div><h1>404</h1></div>} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
