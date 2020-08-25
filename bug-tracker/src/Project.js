import React, { useState } from "react";
import db from './firebase';
import { Redirect, withRouter, Link } from "react-router-dom";


{/* put animation on the name of the project to indicate that it is clickable */ }
function Project(props) {


  const [projectDetails, setProjectDetails] = useState("");

  const saveDetails = (event) => {
    setProjectDetails(props);
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <Link to={{
        pathname: "/registerTicket",
        state: {
          details: props
        }
      }}> Add ticket</Link>
      {/*{props.owner}*/}
    </div >
  );
}

function handleClick(props) {

  /* Redirect to the project to view details */
  // alert(`${props.name}'s details: ${props.owner} is the owner of this project`)

  // return <Route path='/registerTicket' />
  this.props.history.push('/registerTicket');
}


function redirectToCreateTicket() {
  return (<Redirect to='/registerTicket' />)
}


export default withRouter(Project);
