import { useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const TeamsList = ({ teams, setTeams }) => {
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
