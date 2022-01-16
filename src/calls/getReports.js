import axios from "axios";

export const getWeeklyScans = async (team, date) => {
  return await axios.get(
    `http://stubber.test.visiblethread.com/scans/${team}/${date}`
  );
};

export const getReports = async (number, option) => {
  if (option === "months") {
    return await axios.get(
      `http://stubber.test.visiblethread.com/scans/monthly/${number}`
    );
  } else if (option === "weeks") {
    return await axios.get(
      `http://stubber.test.visiblethread.com/scans/weekly/${number}`
    );
  }
};
