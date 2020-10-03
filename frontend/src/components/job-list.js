import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API } from "../api-service";
import { useCookies } from "react-cookie";
import CandidateJobList from "./candidate-job.list";

function JobList(props) {
  const [token] = useCookies(["jp-token"]);

  const jobClicked = (job) => (evt) => {
    props.jobClicked(job);
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
    <React.Fragment>
      {props.isAdmin ? (
        <div>
          {props.jobs &&
            props.jobs.length &&
            props.jobs.map((job) => {
              return (
                <div key={job && job._id} className="job-item">
                  <h2 onClick={jobClicked(job)}>{job && job.company}</h2>
                  <div>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => editClicked(job)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => removeClicked(job)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <CandidateJobList jobs={props.jobs} loggedInUser={props.loggedInUser} />
      )}
    </React.Fragment>
  );
}

export default JobList;
