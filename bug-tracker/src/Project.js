import React from "react";

function Project(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.owner}
    </div>
  );
}

export default Project;
