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
import {
  makeStyles, AppBar, Toolbar, Typography, Grid, Drawer, List,
  Button, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core/';
// import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home'; //change to home icon
import AddIcon from '@material-ui/icons/Add'; //change to something else icon
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  list: {
    width: 250,
  },
  title: {
    flex: 1
  },
  grid: {
    width: '100%',
    height: '10%'
  }
});

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
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* put back button instead to close drawer */}
      <HomeIcon />

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
  );



  return (
    <Router>
      <div className={classes.root}>
        <Grid className={classes.grid}>
          <AppBar position="static">
            <Toolbar>
              <MenuIcon onClick={toggleDrawer(true)} />
              <Typography variant="h3" className={classes.title}>
                <Link to="/" style={{ textDecoration: 'none' }}>Bug Tracker</Link>
                {/* Bug Tracker */}
              </Typography>

            </Toolbar>
          </AppBar>
        </Grid>


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
          <Route path="/tickets/:projectId" component={Project} />
          <Route path="/login" component={Login} />
          <Route path="/registerProject" component={CreateProject} />
          <Route path="/:projectId/registerTicket" component={CreateTicket} />
          <Route path="/" component={Dashboard} />
          <Route path="/" render={() => <div><h1>404</h1></div>} />
        </Switch>
        {/* bottom nav */}
      </div>
    </Router>
  );
}

export default App;
