import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">AI Marketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#list-model">List Model</Nav.Link>
                        <Nav.Link href="#view-models">View Models</Nav.Link>
                        <Nav.Link href="#withdraw-funds">Withdraw Funds</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
