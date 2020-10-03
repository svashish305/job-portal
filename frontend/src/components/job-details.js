import React, { useState } from "react";
import { useCookies } from "react-cookie";

function JobDetails(props) {
  const [token] = useCookies(["jp-token"]);

  let td = props.job;

  const getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/jobs/${td._id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token["jp-token"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateJob(resp))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {td ? (
        <div>
          <h1>{td.company}</h1>
          <p>{td.desc}</p>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default JobDetails;
