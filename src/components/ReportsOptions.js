import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const ReportsOptions = ({
  viewType,
  setViewType,
  reportAmount,
  setReportAmount,
  reportTimeframe,
  setReportTimeframe,
  requestNewReport
}) => {
  return (
    <Row className="mb-5 mt-3">
      <Col xs={"auto"}>
        <InputGroup>
          <InputGroup.Text>Showing report for the last</InputGroup.Text>
          <Form.Control
            type="number"
            defaultValue={reportAmount}
            onChange={(e) => setReportAmount(Number(e.target.value))}
            style={{ width: "80px" }}
          />
        </InputGroup>
      </Col>
      <Col xs={"auto"}>
        <Form.Select
          defaultValue={reportTimeframe}
          onChange={(e) => setReportTimeframe(e.target.value)}
        >
          <option value="months">months</option>
          <option value="weeks">weeks</option>
        </Form.Select>
      </Col>
      <Col>
        <Button variant="outline-primary" onClick={requestNewReport}>New Report</Button>
      </Col>
      <Col xs={"auto"}>
        <InputGroup>
          <InputGroup.Text>View as</InputGroup.Text>
          <Form.Select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="table">Table</option>
            <option value="cards">Cards</option>
          </Form.Select>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default ReportsOptions;
