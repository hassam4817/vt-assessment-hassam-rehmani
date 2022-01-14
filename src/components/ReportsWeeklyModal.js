import { Modal, ListGroup, Card } from "react-bootstrap";
import {monthsMap, monthsMapFullname} from '../utilities/months'

const ReportsWeeklyModal = ({ showModal, setShowModal, modalData }) => {
  //expects a state from parent component with showModal, setShowModal to either true or false
  //expects modalData with format [{date: "yyyy-mm-dd", teamName: "", totalScans: 10}]

  const formatDate = (date) => {
    if (date !== undefined) {
      return `${monthsMap[Number(date.split("-")[1])]} ${date.split("-")[2]}`;
    }
  };

  return (
    <Modal centered show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalData[0].teamName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Showing weekly report for the month of{" "}
        {modalData[0].date !== undefined &&
          monthsMapFullname[Number(modalData[0].date.split("-")[1])]}{" "}
      </Modal.Body>
      <Card>
        <ListGroup variant="flush" className="mb-2">
          {modalData.map((element, index) => (
            <ListGroup.Item key={index}>
              <span style={{ fontWeight: "500" }}>
                {formatDate(element.date)}
              </span>{" "}
              {" > "} {element.totalScans}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Modal>
  );
};

export default ReportsWeeklyModal;
