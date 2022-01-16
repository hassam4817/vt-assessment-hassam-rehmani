import axios from "axios";

export const getTeams = async () => {
  return await axios.get(
    "http://stubber.test.visiblethread.com/teams/allNames"
  );
};