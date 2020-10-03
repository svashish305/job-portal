import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api-service";

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

  const selectJobs = () => {
    let jobIds = applyState
      .filter((as) => as.select === true)
      .map((as) => as._id);
    API.applyForJob(jobIds, token["jp-token"])
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="mb-2rem">Apply to following jobs:</h2>
      {applyState.map((j, i) => (
        <label key={j._id}>
          {j.company} - {j.desc}
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
        </label>
      ))}
      <button type="submit" className="btn btn-primary" onClick={selectJobs()}>
        Apply
      </button>
    </div>
  );
}

export default CandidateJobList;
