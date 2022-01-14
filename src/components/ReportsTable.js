import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReportsWeeklyModal from "./ReportsWeeklyModal";
import { monthsMap } from "../utilities/months";
import axios from "axios";

const ReportsTable = ({ reportsData, currentReportOption }) => {
  const [headings, setHeadings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const generateTableHeadings = (data) => {
    const months = [];
    data[0].reports.forEach((element) => {
      const month = Number(element.date.split("-")[1]);
      const day = Number(element.date.split("-")[2]);
      if (currentReportOption === "months") {
        months.unshift(monthsMap[month]);
      } else if (currentReportOption === "weeks") {
        months.unshift(`${monthsMap[month]} ${day}`);
      }
    });
    const list = ["Team", "Total", ...months];
    return list;
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

  const handleModal = (team, date) => {
    if (currentReportOption === "months") {
      setShowModal(true);
      getWeeklyScans(team, date);
    }
  };

  const getScans = (item) => {
    if (currentReportOption === "months") {
      return item.scansAMonth;
    } else if (currentReportOption === "weeks") {
      return item.scansAWeek;
    }
  };

  useEffect(() => {
    if (reportsData.length > 0) setHeadings(generateTableHeadings(reportsData));
  }, [reportsData, currentReportOption]);

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportsData.map((entry, index) => {
            return (
              <tr key={index}>
                <td style={{ width: "150px", fontWeight: "bold" }}>
                  {entry.teamName}
                </td>
                <td style={{ width: "150px" }}>{entry.totalScans}</td>
                {[...entry.reports].reverse().map((report, index) => (
                  <td
                    key={index}
                    onClick={() => handleModal(report.teamName, report.date)}
                    style={
                      currentReportOption === "months"
                        ? { cursor: "pointer" }
                        : { cursor: "inherit" }
                    }
                  >
                    {getScans(report)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReportsWeeklyModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
      />
    </>
  );
};

export default ReportsTable;
