import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { getTeams } from "../calls/teamsList";

const TeamsGroupList = () => {
  const [teams, setTeams] = useState([""]);

  useState(() => {
    getTeams()
      .then((response) => setTeams(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <ListGroup>
        {teams.map(
          (team, index) =>
            index < 5 && <ListGroup.Item key={index}>{team}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default TeamsGroupList;
