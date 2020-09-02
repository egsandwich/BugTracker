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
import TicketList from "./TicketList";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'; //change to home icon
import AddIcon from '@material-ui/icons/Add'; //change to something else icon

//dashboard
//more views i guess

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
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
    <div
      className={classes.list}
      //     [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      // })}
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
        {/* {['Home', 'Profile'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </List>
    </div>
  );



  return (
    <Router>
      <div className="App">
        <Link to="/" style={{ textDecoration: 'none' }}><HomeIcon /></Link>
        <Button onClick={toggleDrawer(true)}>Menu
            </Button>

        <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>{list}</Drawer>
        {/* <nav> */}

        {/* <ul>
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

        </nav> */}

        {/* if logged in show dashboard */}
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/projects/:projectId" component={Project} />
          <Route path="/login" component={Login} />
          <Route path="/registerProject" component={CreateProject} />
          <Route path="/:projectId/registerTicket" component={CreateTicket} />
          {/* <Route path="/tickets/:projectId" component={TicketList} /> */}
          <Route path="/" component={Dashboard} />
          <Route path="/" render={() => <div><h1>404</h1></div>} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
