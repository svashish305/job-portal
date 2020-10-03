import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api-service";
import { Row, Col, Toast } from "react-bootstrap";

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

  const selectJobs = () => {
    let jobIds = applyState
      .filter((as) => as.select === true)
      .map((as) => as._id);
    if (jobIds.length) {
      // console.log(jobIds);
      API.applyForJob(JSON.stringify(jobIds), token["jp-token"])
        .then((resp) => setShow(true))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h2 className="mb-2rem">Apply to following jobs:</h2>
      {applyState.map((j, i) => (
        <div key={j._id}>
          <label>
            {j.company} - {j.desc} -{" "}
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
      <button type="submit" className="btn btn-primary" onClick={selectJobs()}>
        Apply
      </button>
      <div className="toast-container">
        <Row>
          <Col xs={6}>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">MERN JOB PORTAL</strong>
                <small>A few seconds ago</small>
              </Toast.Header>
              <Toast.Body>Woohoo, you've applied to multiple jobs!</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CandidateJobList;
