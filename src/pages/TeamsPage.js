import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamsPage = () => {
  const [teams, setTeams] = useState([""]);
  const [newTeam, setNewTeam] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get(
          "http://stubber.test.visiblethread.com/teams/allNames"
        );

        // console.log(response.data);
        setTeams(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTeams();
  }, []);

  const createTeam = async (team) => {
    try {
      const response = await axios.post(
        "http://stubber.test.visiblethread.com/teams/add",
        { teamName: team }
      );
      // console.log(response.data);
      setNewTeam("");

      setSuccess("Team has been succesfully created");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfTeamExists = (team) => {
    if (teams.indexOf(team) >= 0) return true;
    else return false;
  };

  const userFormSubmit = (e) => {
    e.preventDefault();
    if (checkIfTeamExists(newTeam)) {
      setError("This user already exists");
      setTimeout(() => setError(""), 2000);
    } else {
      createTeam(newTeam);
    }
  };

  return (
    <div>
      <h2>These are all the teams available in your organisation</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
      <form onSubmit={userFormSubmit}>
        <input
          type="text"
          placeholder="Team name"
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
          required
        />
        <button>Create</button>
      </form>
      {success === "" || <p>{success}</p>}
      {error === "" || <p>{error}</p>}
    </div>
  );
};

export default TeamsPage;
