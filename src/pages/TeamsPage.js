import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import TeamsCreateNew from "../components/TeamsCreateNew";
import TeamsList from "../components/TeamsList";

const TeamsPage = () => {
  const [teams, setTeams] = useState([""]);

  return (
    <>
      <div className="py-5">
        <h2 className="text-center">Teams available in your organisation</h2>

        <Row className=" my-5">
          <Col lg={4} xl={3} className="mb-5">
            <TeamsCreateNew teams={teams} setTeams={setTeams} />
          </Col>
          <Col lg={{ span: 8, order: "first" }} xl={9}>
            <TeamsList teams={teams} setTeams={setTeams} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TeamsPage;
