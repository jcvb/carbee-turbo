import { Badge, Card } from "react-bootstrap";

const useFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/[, ]/g, " ");

  return formattedDate;
};

const formatTime = (date: any) => {
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

const calculateEndTime = (scheduledTime: any, duration: any, status: any) => {
  const startTime = new Date(scheduledTime);
  const endTime = new Date(startTime.getTime() + duration * 60000);

  let timeRange =
    status === "COMPLETE"
      ? `${formatTime(startTime)} - ${formatTime(endTime)}`
      : formatTime(startTime);
  return timeRange;
};

const AppointmentCard = ({
  status,
  duration,
  workOrder,
  image,
  date,
}: {
  status: string;
  duration: string;
  workOrder: any;
  image: string;
  date: string;
}) => {
  const formattedDate = useFormattedDate(date);
  const timeRange = calculateEndTime(date, duration, status);
  const classes = `
    ${status === "COMPLETE" ? "color-success" : ""} 
    ${status === "SCHEDULED" ? "color-danger" : ""} 
    ${status === "PAID" ? "color-warn" : ""}
    ${status === "IN_PROGRESS" ? "brand-tertiary-500" : ""}
  `;
  return (
    <>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>
            <Badge bg={classes.trim()}>{status}</Badge>
            <strong> {formattedDate} </strong>
          </Card.Title>
          <Card.Text>
            <div className="flex flex-row">
              <div>
                <strong>Started/Completed</strong>
              </div>
              <div className="text-font-color-light-grey">{timeRange}</div>
            </div>
            <p>{workOrder.service}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default AppointmentCard;
