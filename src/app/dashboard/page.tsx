"use client";

import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentsService";
import AppointmentCard from "../components/AppointmentCard";
import Loading from "../components/Loading";

const Pagination = ({
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: {
  onNextPage: any;
  onPreviousPage: any;
  hasNextPage: any;
  hasPreviousPage: any;
}) => (
  <div className="d-flex justify-content-end my-4">
    <ButtonGroup aria-label="Pagination">
      <Button
        variant="brand-secondary-300"
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
      >
        Previous page
      </Button>
      <Button
        variant="brand-secondary"
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        Next page
      </Button>
    </ButtonGroup>
  </div>
);

export default function Page() {
  const { status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [nextCursor, setNextCursor] = useState("");
  const [previousCursor, setPreviousCursor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async (first = 10, before = "", after = "") => {
    setLoading(true);
    try {
      const data = await getAppointments(first, before, after);
      setAppointments(data.appointments.edges);
      setHasNextPage(data.appointments.pageInfo.hasNextPage);
      setHasPreviousPage(data.appointments.pageInfo.hasPreviousPage);
      setNextCursor(data.appointments.pageInfo.nextCursor);
      setPreviousCursor(data.appointments.pageInfo.previousCursor);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderAppointments = () => (
    <Row xs={1} md={2} className="g-4">
      {appointments.map((appointment: any) => (
        <Col key={appointment.node.id}>
          <AppointmentCard
            status={appointment.node.status}
            duration={appointment.node.duration}
            workOrder={appointment.node.workOrder}
            date={appointment.node.scheduledTime}
            image="https://random.imagecdn.app/500/150"
          />
        </Col>
      ))}
    </Row>
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleNextPage = () => fetchAppointments(10, "", nextCursor);
  const handlePreviousPage = () => fetchAppointments(10, previousCursor);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  return (
    <>
      <Container>
        {loading && <Loading />}
        {!loading && (
          <div className="my-5">
            <h3>Appointments</h3>
            <Pagination
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
            {renderAppointments()}
            <Pagination
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </div>
        )}
      </Container>
    </>
  );
}
