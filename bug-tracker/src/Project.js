import React, { useState } from "react";
import db from './firebase';
import { Redirect, withRouter, useHistory } from "react-router-dom";
import CreateTicket from "./CreateTicket";


{/* put animation on the name of the project to indicate that it is clickable */ }
function Project(props) {


  // const [projectDetails, setProjectDetails] = useState("");

  // const saveDetails = (event) => {
  //   setProjectDetails(props);
  // }
  const history = useHistory();
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.id}</p>
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
