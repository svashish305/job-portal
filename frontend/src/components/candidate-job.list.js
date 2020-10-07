import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api-service";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function CandidateJobList(props) {
  const [token] = useCookies(["jp-token"]);
  const [applyState, setApplyState] = useState([]);

  useEffect(() => {
    let applyState = props.jobs;

    setApplyState(
      applyState.map((job) => {
        return {
          select: false,
          _id: job._id,
          company: job.company,
          desc: job.desc,
        };
      })
    );
  }, []);

  const selectJobs = (applyState) => {
    let jobIds = applyState
      .filter(
        (as) =>
          as.select === true &&
          !props.loggedInUser.jobApplications.includes(as._id)
      )
      .map((as) => as._id);
    console.log(jobIds);
    API.applyForJob(jobIds, token["jp-token"])
      .then((resp) => {
        toast.success("Applied Successfully!");
      })
      .catch((error) => console.log(error));
  };

  const checkApplyStatus = (job_id) => {
    if (props.loggedInUser.jobApplications.includes(job_id)) {
      return "Applied";
    } else {
      return "Not Applied";
    }
  };

  return (
    <div>
      <h2 className="mb-2rem">Apply to following jobs:</h2>
      {applyState.map((j, i) => (
        <div key={j._id} className="cd-job-item">
          <label>
            {j.company} - {j.desc} : {checkApplyStatus(j._id)}
          </label>
          {checkApplyStatus(j._id) === "Not Applied" ? (
            <input
              className="pos-checkbox"
              onChange={(event) => {
                let checked = event.target.checked;
                if (props.loggedInUser.jobApplications.includes(j._id)) {
                  toast.error("Already Applied! Wait for new jobs");
                  checked = false;
                }
                setApplyState(
                  applyState.map((job) => {
                    if (j._id === job._id) {
                      job.select = checked;
                    }
                    return job;
                  })
                );
              }}
              type="checkbox"
              checked={j.select}
            />
          ) : null}
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-primary pointer-cursor"
        onClick={() => selectJobs(applyState)}
      >
        Apply
      </button>
      <ToastContainer />
    </div>
  );
}

export default CandidateJobList;
