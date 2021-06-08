import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from 'react-bootstrap';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <NavbarBrand as={Link} to="/">DreamMe</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/dreams">All Dreams</Nav.Link>
              <Nav.Link as={Link} to="/add-dream">Add a Dream</Nav.Link>
              {/* <Nav.Link as={Link} to="/data">View Data Breakdown</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
