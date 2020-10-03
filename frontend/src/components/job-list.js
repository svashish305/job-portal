import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function JobList(props) {
  const [token] = useCookies(["jp-token"]);

  const todoClicked = (job) => (evt) => {
    props.todoClicked(job);
  };

  const editClicked = (job) => {
    props.editClicked(job);
  };

  const removeClicked = (job) => {
    API.deleteJob(job._id, token["jp-token"])
      .then(() => props.removeClicked(job))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {props.jobs &&
        props.jobs.length &&
        props.jobs.map((job) => {
          return (
            <div key={job && job._id} className="job-item">
              <h2 onClick={todoClicked(job)}>{job && job.company}</h2>
              <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(job)} />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => removeClicked(job)}
              />
            </div>
          );
        })}
    </div>
  );
}

export default JobList;
