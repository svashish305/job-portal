import React from "react";
import { useCookies } from "react-cookie";

function CandidateList(props) {
  const [token] = useCookies(["jp-token"]);

  return (
    <div>
      {props.appliedCandidates &&
        props.appliedCandidates.length &&
        props.appliedCandidates.map((candidate) => {
          return (
            <div key={candidate && candidate._id} className="job-item">
              <h2>{candidate && candidate.email}</h2>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default CandidateList;
