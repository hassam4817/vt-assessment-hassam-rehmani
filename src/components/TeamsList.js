import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { getTeams } from "../calls/teamsList";

const TeamsList = ({ teams, setTeams }) => {
  useEffect(() => {
    getTeams()
      .then((response) => setTeams(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="module p-3 teams-list">
      {teams.map((team, index) => (
        <Card key={index} body>
          {team}
        </Card>
      ))}
    </div>
  );
};

export default TeamsList;
