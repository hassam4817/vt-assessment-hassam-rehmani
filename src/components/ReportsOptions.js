import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const ReportsOptions = ({
  viewType,
  setViewType,
  requestNewReport,
  inputValues,
  setInputValues,
}) => {
  const handleAmount = (e) => {
    setInputValues({
      ...inputValues,
      amount: Number(e.target.value),
    });
  };

  const handleType = (e) => {
    setInputValues({
      ...inputValues,
      type: e.target.value,
    });
  };

  return (
    <Row className="mb-5 mt-3">
      <Col md={"auto"} className="mb-3">
        <InputGroup>
          <InputGroup.Text>Showing report for the last</InputGroup.Text>
          <Form.Control
            type="number"
            defaultValue={inputValues.amount}
            onChange={handleAmount}
            style={{ width: "80px" }}
          />
        </InputGroup>
      </Col>
      <Col md={"auto"} className="mb-3">
        <Form.Select defaultValue={inputValues.type} onChange={handleType}>
          <option value="months">months</option>
          <option value="weeks">weeks</option>
        </Form.Select>
      </Col>
      <Col className="mb-3">
        <Button variant="outline-primary" onClick={requestNewReport}>
          New Report
        </Button>
      </Col>
      <Col md={"auto"} className="mb-3">
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
