import { useState } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import ReportsWeeklyModal from "./ReportsWeeklyModal";
import { monthsMap } from "../utilities/months";
import axios from "axios";

const ReportsCards = ({ reportsData, currentReportOption }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const formatDate = (date) => {
    const month = date.split("-")[1];
    if (currentReportOption === "weeks") {
      return `${monthsMap[Number(month)]} ${date.split("-")[2]}`;
    }
    return monthsMap[Number(month)];
  };

  const getWeeklyScans = async (team, date) => {
    try {
      const response = await axios.get(
        `http://stubber.test.visiblethread.com/scans/${team}/${date}`
      );
      // console.log(response.data);
      setModalData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getScans = (item) => {
    if (currentReportOption === "months") {
      return item.scansAMonth;
    } else if (currentReportOption === "weeks") {
      return item.scansAWeek;
    }
  };

  const handleModal = (team, date) => {
    if (currentReportOption === "months") {
      setShowModal(true);
      getWeeklyScans(team, date);
    }
  };

  return (
    <>
      <Row>
        {reportsData.map((element, index) => (
          <Col key={index} md={6} lg={4} xl={3} xxl={2}>
            <Card className="mb-5">
              <Card.Body>
                <Card.Title>{element.teamName}</Card.Title>
                <Card.Text>Total Scans: {element.totalScans}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {element.reports.map((report, index) => (
                  <ListGroupItem
                    key={index}
                    onClick={() => handleModal(report.teamName, report.date)}
                    style={
                      currentReportOption === "months"
                        ? { cursor: "pointer" }
                        : { cursor: "inherit" }
                    }
                  >
                    <span style={{ fontWeight: "500" }}>
                      {formatDate(report.date)}:
                    </span>{" "}
                    {getScans(report)}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <ReportsWeeklyModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
      />
    </>
  );
};

export default ReportsCards;
