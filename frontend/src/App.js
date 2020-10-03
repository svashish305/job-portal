import React, { useState, useEffect } from "react";
import "./App.css";
import JobList from "./components/job-list";
import JobDetails from "./components/job-details";
import JobForm from "./components/job-form";
import CandidateList from "./components/candidate.list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["jp-token"]);
  const [
    data,
    loggedInUser,
    isAdmin,
    appliedCandidates,
    loading,
    error,
  ] = useFetch();
  const [showAppliedCandidates, setShowAppliedCandidates] = useState(null);

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

  const loadCandidates = () => {
    setShowAppliedCandidates(true);
  };

  const unloadCandidates = () => {
    setShowAppliedCandidates(false);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading jobs</h1>;

  return (
    <React.Fragment>
      {isAdmin && showAppliedCandidates ? (
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
              {appliedCandidates ? (
                <CandidateList appliedCandidates={appliedCandidates} />
              ) : null}
              <button onClick={unloadCandidates}>Go Back</button>
            </div>
          </div>
        </div>
      ) : (
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
                  loggedInUser={loggedInUser}
                  isAdmin={isAdmin}
                  jobs={jobs}
                  jobClicked={loadJob}
                  editClicked={editClicked}
                  removeClicked={removeClicked}
                />
              ) : null}
              {isAdmin ? <button onClick={newJob}>New Job</button> : null}
              {isAdmin ? (
                <button onClick={loadCandidates}>
                  List of applied Candidates
                </button>
              ) : null}
            </div>
            <JobDetails job={selectedJob} updateJob={loadJob} />
            {isAdmin && editedJob ? (
              <JobForm
                job={editedJob}
                updatedJob={updatedJob}
                jobCreated={jobCreated}
              />
            ) : null}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
