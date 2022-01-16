import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import TeamsGroupList from "../components/TeamsGroupList";
import { getReports } from "../calls/getReports";
import ReportsTable from "../components/ReportsTable";
import { formatReportsData } from "../utilities/reportsData";

const HomePage = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    getReports(4, "weeks")
      .then((response) => {
        setReportData(formatReportsData(response.data, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="py-5">
        <h1 className="text-center">Welcome to your dashboard, $user</h1>
      </div>
      <Row>
        <Col md="4" lg="3">
          <p>Your most viewed teams:</p>
          <TeamsGroupList />
          <Link to="/teams" className="btn btn-outline-primary my-4">
            See all teams
          </Link>
        </Col>
        <Col>
          <p>Last 4 weeks snapshot:</p>
          <ReportsTable
            reportsData={reportData}
            currentType={"weeks"}
          />
          <Link to="/reports" className="btn btn-outline-primary my-3">
            Full reports
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
