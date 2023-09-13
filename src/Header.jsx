import React from "react";
import Auth0Button from './HelperComponents/Auth0Button';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { useOktaAuth } from "@okta/okta-react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";

const Header = () => {

    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Nav className="me-auto">
              <Auth0Button/>
                <Nav.Link style={{color: 'white'}} href="/">Home</Nav.Link>
                <Nav.Link style={{color: 'white'}} href="/garden">Garden</Nav.Link>
                <Nav.Link style={{color: 'white'}} href="/profile">Profile</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
    );

};
export default Header;