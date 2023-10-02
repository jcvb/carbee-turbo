"use client";

import { Button, Container, Navbar } from "react-bootstrap";
import Logo from "./Logo";
import { signOut } from "next-auth/react";
import { useState } from "react";
import AvailabilityModal from "./AvailabilityModal";

const Header = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  return (
    <Navbar bg="brand-primary" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <div className="w-2 h-2 flex">
            <Logo />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="outline-shade-light mx-4" onClick={handleShow}>
              <span className="bold ">Book Appointment</span>
            </Button>
            <Button onClick={() => signOut()} variant="brand-primary">
              <span className="bold text-white">Sign Out</span>
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
        <AvailabilityModal show={show} handleClose={handleClose} />
      </Container>
    </Navbar>
  );
};

export default Header;
