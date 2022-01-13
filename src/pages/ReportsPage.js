import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import Report from "../components/Report";

const ReportsPage = () => {
  const [reportNumber, setReportNumber] = useState(6);
  const [reportOption, setReportOption] = useState("months");
  const [reportData, setReportData] = useState([]);
  const [currentReportOption, setCurrentReportOption] = useState("months");

  const formatData = (fullData) => {
    // console.log(fullData);
    const chunked = _.chunk(fullData, reportNumber + 1);
    // console.log(chunked);
    const formattedData = chunked.map((element) => {
      const generalData = { ...element[element.length - 1] };
      generalData.reports = element.slice(0, element.length - 1);
      return generalData;
    });

    // console.log(formattedData);
    return formattedData;
  };

  const getReports = async (number, option) => {
    if (option === "months") {
      try {
        const response = await axios.get(
          `http://stubber.test.visiblethread.com/scans/monthly/${number}`
        );
        setReportData(formatData(response.data));
        setCurrentReportOption("months");
      } catch (err) {
        console.log(err);
      }
    } else if (option === "weeks") {
      try {
        const response = await axios.get(
          `http://stubber.test.visiblethread.com/scans/weekly/${number}`
        );
        setReportData(formatData(response.data));
        setCurrentReportOption("weeks");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid option value");
    }
  };

  const requestNewReport = () => {
    getReports(reportNumber, reportOption);
  };

  useEffect(() => {
    getReports(reportNumber, reportOption);
  }, []);

  return (
    <div>
      <h2>Welcome to the reports page</h2>
      <div>
        <p>Showing report for the last</p>
        <input
          type="number"
          defaultValue={reportNumber}
          onChange={(e) => setReportNumber(Number(e.target.value))}
        />
        <select
          name="reportOption"
          id="reportOption"
          defaultValue={reportOption}
          onChange={(e) => setReportOption(e.target.value)}
        >
          <option value="weeks">weeks</option>
          <option value="months">months</option>
        </select>
        <button onClick={requestNewReport}>Report</button>
      </div>
      <Report
        reportData={reportData}
        currentReportOption={currentReportOption}
      />
    </div>
  );
};

export default ReportsPage;
