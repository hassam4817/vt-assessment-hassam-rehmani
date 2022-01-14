import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";

import ReportsOptions from "../components/ReportsOptions";
import ReportsTable from "../components/ReportsTable";
import ReportsCards from "../components/ReportsCards";


const ReportsPage = () => {
  const [reportAmount, setReportAmount] = useState(6);
  const [reportTimeframe, setReportTimeframe] = useState("months");
  const [reportData, setReportData] = useState([]);
  const [currentReportOption, setCurrentReportOption] = useState("months");
  const [viewType, setViewType] = useState("table");

  const formatData = (fullData) => {
    // console.log(fullData);
    const chunked = _.chunk(fullData, reportAmount + 1);
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
    getReports(reportAmount, reportTimeframe);
  };

  useEffect(() => {
    getReports(reportAmount, reportTimeframe);
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-center">My reports page</h2>
      <div className="module p-3 my-5">
        <ReportsOptions
          viewType={viewType}
          setViewType={setViewType}
          reportAmount={reportAmount}
          setReportAmount={setReportAmount}
          reportTimeframe={reportTimeframe}
          setReportTimeframe={setReportTimeframe}
          requestNewReport={requestNewReport}
        />
        {viewType === "table" ? (
          <ReportsTable
            reportsData={reportData}
            currentReportOption={currentReportOption}
          />
        ) : (
          <ReportsCards
            reportsData={reportData}
            currentReportOption={currentReportOption}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
