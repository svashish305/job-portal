export class API {
  static loginUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static registerUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static currentLoggedInUser(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/loggedin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static applyForJob(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/apply-jobs`, {
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

  static getAppliedCandidates(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/apply-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static getJobs(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/jobs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static updateJob(todo_id, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/jobs/${todo_id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static createJob(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/jobs/`, {
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

  static deleteJob(todo_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/jobs/${todo_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getJobApplicationStatus(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/jobs/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(body),
      },
    }).then((resp) => resp.json());
  }
}
