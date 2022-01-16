import { useState, useEffect } from "react";

import ReportsOptions from "../components/ReportsOptions";
import ReportsTable from "../components/ReportsTable";
import ReportsCards from "../components/ReportsCards";

import { getReports } from "../calls/getReports";
import { formatReportsData } from "../utilities/reportsData";

const ReportsPage = () => {
  const defaults = {
    amount: 6,
    type: "months",
  };

  const [reportData, setReportData] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [currentType, setCurrentType] = useState(defaults.type);

  const [inputValues, setInputValues] = useState({
    amount: defaults.amount,
    type: defaults.type,
  });


  const requestNewReport = () => {
    getReports(inputValues.amount, inputValues.type)
      .then((response) => {
        setReportData(formatReportsData(response.data, inputValues.amount));
        setCurrentType(inputValues.type);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    requestNewReport();
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-center">My reports page</h2>
      <div className="module p-3 my-5">
        <ReportsOptions
          viewType={viewType}
          setViewType={setViewType}
          requestNewReport={requestNewReport}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
        {viewType === "table" ? (
          <ReportsTable reportsData={reportData} currentType={currentType} />
        ) : (
          <ReportsCards reportsData={reportData} currentType={currentType} />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
