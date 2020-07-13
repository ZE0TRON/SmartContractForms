import React from "react";
import { Navbar, Nav } from "react-bootstrap";
export default function TopNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Smart Contract Forms</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/form">Form</Nav.Link>
          <Nav.Link href="/integration">Integration</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
