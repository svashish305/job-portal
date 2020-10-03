import React, { useState, useEffect } from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function JobForm(props) {
  const [company, setCompany] = useState("");
  const [desc, setDesc] = useState("");
  const [token] = useCookies(["jp-token"]);

  useEffect(() => {
    setCompany(props.job.company);
    setDesc(props.job.desc);
  }, [props.job]);

  const updateClicked = () => {
    API.updateJob(props.job._id, { company, desc }, token["jp-token"])
      .then((resp) => props.updatedJob(resp))
      .catch((error) => console.log(error));
  };

  const createClicked = () => {
    API.createJob({ company, desc }, token["jp-token"])
      .then((resp) => props.jobCreated(resp))
      .catch((error) => console.log(error));
  };

  const isDisabled = company.length === 0 || desc.length === 0;

  return (
    <React.Fragment>
      {props.job ? (
        <div>
          <label htmlFor="company">Company</label>
          <br />
          <input
            id="company"
            type="text"
            placeholder="Company"
            value={company}
            onChange={(evt) => setCompany(evt.target.value)}
          />
          <br />
          <label htmlFor="desc">Desc</label>
          <br />
          <textarea
            id="desc"
            type="text"
            placeholder="Desc"
            value={desc}
            onChange={(evt) => setDesc(evt.target.value)}
          ></textarea>
          <br />
          {props.job._id ? (
            <button onClick={updateClicked} disabled={isDisabled}>
              Update
            </button>
          ) : (
            <button onClick={createClicked} disabled={isDisabled}>
              Create
            </button>
          )}
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default JobForm;
