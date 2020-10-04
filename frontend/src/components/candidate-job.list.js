import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api-service";

function CandidateJobList(props) {
  const [token] = useCookies(["jp-token"]);
  const [show, setShow] = useState(false);
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
        console.log(resp);
        setShow(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="mb-2rem">Apply to following jobs:</h2>
      {applyState.map((j, i) => (
        <div key={j._id}>
          <label>
            {j.company} - {j.desc}
            {/* {j.applicants && j.applicants.includes(props.loggedInUser._id)
              ? "Applied"
              : "Not Applied"} */}
          </label>
          <input
            onChange={(event) => {
              let checked = event.target.checked;
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
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => selectJobs(applyState)}
      >
        Apply
      </button>
    </div>
  );
}

export default CandidateJobList;
