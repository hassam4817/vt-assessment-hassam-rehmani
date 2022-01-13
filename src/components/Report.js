import React, { useState } from "react";
import axios from "axios";

const Report = ({ reportData, currentReportOption }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  const getWeeklyScans = async (team, date) => {
    try {
      const response = await axios.get(
        `http://stubber.test.visiblethread.com/scans/${team}/${date}`
      );
      console.log(response.data);
      setWeeklyData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = ({ teamName, date }) => {
    currentReportOption === "months" && getWeeklyScans(teamName, date);
  };

  return (
    <div>
      {reportData.map((team, index) => (
        <ul key={index}>
          <li>Team name: {team.teamName}</li>
          <li>Total scans: {team.totalScans}</li>
          <ul>
            {team.reports.map((report, index) => (
              <li key={index} onClick={() => handleClick(report)}>
                {report.date} 
                {" "}
                {currentReportOption === "months" ? report.scansAMonth : report.scansAWeek}
              </li>
            ))}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export default Report;
