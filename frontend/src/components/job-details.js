import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api-service";

function JobDetails(props) {
  const [token] = useCookies(["jp-token"]);

  let td = props.job;

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    console.log(td);
    if (td) {
      API.getAppliedCandidatesOfJob(props.job._id, token["jp-token"])
        .then((applicants) => setApplicants(applicants))
        .catch((error) => setApplicants([]));
    }
  }, [td]);

  return (
    <React.Fragment>
      {td ? (
        <div>
          <h1>Company: {td.company}</h1>
          <p>Desc: {td.desc}</p>
          <p>List of candidates applied to this job: </p>
          <div>
            {applicants &&
              applicants.length &&
              applicants.map((candidate) => {
                return (
                  <ol key={candidate && candidate._id} className="job-item">
                    <li className="job-candidate">
                      {candidate && candidate.email}
                    </li>
                    <br />
                  </ol>
                );
              })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default JobDetails;
