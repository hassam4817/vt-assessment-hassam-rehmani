import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const TeamsCreateNew = ({ teams, setTeams }) => {
  const [newTeam, setNewTeam] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      <div className="module p-3">
        <Form onSubmit={userFormSubmit} className="pb-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Create new Team</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>

        {success === "" || (
          <Alert variant={"success"}>
            Your team has been added to the list
          </Alert>
        )}
        {error === "" || (
          <Alert variant={"danger"}>The team you selected already exists</Alert>
        )}
      </div>
    </div>
  );
};

export default TeamsCreateNew;
