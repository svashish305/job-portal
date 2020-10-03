import React, { useState, useEffect } from "react";
import "./App.css";
import JobList from "./components/job-list";
import JobDetails from "./components/job-details";
import JobForm from "./components/job-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useFetch } from "./hooks/useFetch";
import role from "./role";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["jp-token"]);
  const [data, loggedInUser, loading, error] = useFetch();

  useEffect(() => {
    setJobs(data);
  }, [data]);

  useEffect(() => {
    if (!token["jp-token"]) window.location.href = "/";
  }, [token]);

  const loadJob = (job) => {
    setSelectedJob(job);
    setEditedJob(null);
  };

  const updatedJob = (job) => {
    const newJobs = jobs.map((td) => {
      if (td._id === job._id) {
        return job;
      }
      return td;
    });
    setJobs(newJobs);
  };

  const editClicked = (job) => {
    setEditedJob(job);
    setSelectedJob(null);
  };

  const newJob = () => {
    setEditedJob({ desc: "", priority: "", completed: false });
    setSelectedJob(null);
  };

  const jobCreated = (job) => {
    const newJobs = [...jobs, job];
    setJobs(newJobs);
  };

  const removeClicked = (job) => {
    const newJobs = jobs.filter((td) => td._id !== job._id);
    setJobs(newJobs);
  };

  const logoutUser = () => {
    deleteToken(["jp-token"]);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading jobs</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>MERN JOB PORTAL</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
        <h1>Hi {loggedInUser.email}!</h1>
        <br></br>
        <div>
          {jobs ? (
            <JobList
              jobs={jobs}
              jobClicked={loadJob}
              editClicked={editClicked}
              removeClicked={removeClicked}
            />
          ) : null}
          <button onClick={newJob}>New Job</button>
        </div>
        <JobDetails job={selectedJob} updateJob={loadJob} />
        {editedJob ? (
          <JobForm
            job={editedJob}
            updatedJob={updatedJob}
            jobCreated={jobCreated}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
