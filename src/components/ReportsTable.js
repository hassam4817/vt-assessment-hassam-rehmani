import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReportsWeeklyModal from "./ReportsWeeklyModal";
import { monthsMap } from "../utilities/months";
import { getWeeklyScans } from "../calls/getReports";

const ReportsTable = ({ reportsData, currentType }) => {
  const [headings, setHeadings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const generateTableHeadings = (data) => {
    const months = [];
    data[0].reports.forEach((element) => {
      const month = Number(element.date.split("-")[1]);
      const day = Number(element.date.split("-")[2]);
      if (currentType === "months") {
        months.unshift(monthsMap[month]);
      } else if (currentType === "weeks") {
        months.unshift(`${monthsMap[month]} ${day}`);
      }
    });
    const list = ["Team", "Total", ...months];
    return list;
  };

  const handleModal = (team, date) => {
    if (currentType === "months") {
      getWeeklyScans(team, date)
        .then((response) => setModalData(response.data))
        .catch((err) => console.error(err));
      setShowModal(true);
    }
  };

  const getScans = (item) => {
    if (currentType === "months") {
      return item.scansAMonth;
    } else if (currentType === "weeks") {
      return item.scansAWeek;
    }
  };

  useEffect(() => {
    if (reportsData.length > 0) setHeadings(generateTableHeadings(reportsData));
  }, [reportsData, currentType]);

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
                      currentType === "months"
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
