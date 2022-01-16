import _ from "lodash";

export const formatReportsData = (fullData, reportAmount) => {
  const chunked = _.chunk(fullData, reportAmount + 1);
  
  const formattedData = chunked.map((element) => {
    const generalData = { ...element[element.length - 1] };
    generalData.reports = element.slice(0, element.length - 1);
    return generalData;
  });
  
  return formattedData;
};