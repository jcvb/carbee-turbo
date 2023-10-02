import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { getAppointmentByDate } from "../services/appointmentsService";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Loading from "./Loading";
import { ListGroup } from "react-bootstrap";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function AvailabilityModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: any;
}) {
  const [dateAppointment, setDateAppointment] = useState<Value>(new Date());
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date: Value) => {
    setDateAppointment(date);
    if (date instanceof Date) {
      const formattedDate = date.toISOString().split("T")[0];
      fetchAvailability(formattedDate);
    }
  };

  const fetchAvailability = async (date: string) => {
    setLoading(true);
    try {
      const data = await getAppointmentByDate(date);
      setAvailability(data.availability);
      console.log("data", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    } as const;

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    } as const;

    const readableDate = date.toLocaleDateString("es-ES", dateOptions);
    const readableTime = date.toLocaleTimeString("es-ES", timeOptions);

    return readableDate + " " + readableTime;
  };

  const handleAvailability = (date: any) => {
    alert("Date selected " + formatDate(date));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loading && (
            <>
              <p>
                <span>Select the date to schedule the appointment</span>
                <DatePicker
                  onChange={handleDateChange}
                  value={dateAppointment}
                />
              </p>
              <div>
                <ListGroup defaultActiveKey="#item1">
                  {availability.map((item, key) => (
                    <ListGroup.Item
                      key={item}
                      href={`#link${key}`}
                      action
                      onClick={() => {
                        handleAvailability(item);
                      }}
                    >
                      { formatDate(item) }
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </>
          )}
          {loading && <Loading />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AvailabilityModal;
