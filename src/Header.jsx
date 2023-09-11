import React from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

const Header = () => {
    // const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut('/');
    // const login = async () => {
    //     history.push('/login');
    //     console.log( "login", history );
    // }

    if (!authState || authState.isPending) {
        return <div>Loading...</div>;
    }
    
    return (
        <Nav variant="underline" className="justify-content-end" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link href="/">Welcome</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/gardens" eventKey="link-1">Gardens</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            {authState && authState.isAuthenticated
                ? <Button variant="secondary" onClick={logout}>Logout</Button>
                : <Button variant="secondary" onClick={login}>Login</Button>}
            </Nav.Item>
        </Nav>
    )

    // return (
    //     <Navbar bg="light" expand="lg">
    //     <Navbar.Brand href="/">Garden Aid</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="mr-auto">
    //         <Nav.Link href="/">Home</Nav.Link>
    //         <Nav.Link href="/gardens">Gardens</Nav.Link>
    //         </Nav>
    //         <Form inline>
    //         {button}
    //         </Form>
    //     </Navbar.Collapse>
    //     </Navbar>
    // );
};
export default Header;