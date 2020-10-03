import { useState, useEffect } from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";
import role from "../role";

function useFetch() {
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [token] = useCookies(["jp-token"]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await API.getJobs(token["jp-token"]).catch((err) =>
        setError(err)
      );
      setData(data);
      const loggedInUser = await API.currentLoggedInUser(
        token["jp-token"]
      ).catch((err) => setError(err));
      setLoggedInUser(loggedInUser);
      const isAdmin = loggedInUser.role === role.Admin;
      setIsAdmin(isAdmin);
      if (isAdmin) {
        const appliedCandidates = await API.getAppliedCandidates(
          token["jp-token"]
        ).catch((err) => setError(err));
        setAppliedCandidates(appliedCandidates);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return [data, loggedInUser, isAdmin, appliedCandidates, loading, error];
}

export { useFetch };
