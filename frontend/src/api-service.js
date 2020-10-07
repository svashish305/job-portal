export class API {
  static loginUser(body) {
    return fetch(`/api/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static registerUser(body) {
    return fetch(`/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static currentLoggedInUser(token) {
    return fetch(`/api/users/loggedin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static applyForJob(body, token) {
    return fetch(`/api/users/apply-jobs`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  static getAppliedCandidates(token) {
    return fetch(`/api/users/apply-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static getAppliedCandidatesOfJob(job_id, token) {
    return fetch(`/api/jobs/applicants/${job_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static getJobs(token) {
    return fetch(`/api/jobs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static updateJob(job_id, body, token) {
    return fetch(`/api/jobs/${job_id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static createJob(body, token) {
    return fetch(`/api/jobs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  static deleteJob(job_id, token) {
    return fetch(`/api/jobs/${job_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
