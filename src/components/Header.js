import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import applaudo from '../icon.png'; 
export default function Header(){
    return (
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand as={Link} to="/characters">
                    <img
                        alt=""
                        src={applaudo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
                        <Nav.Link as={Link} to="/comics">Comics</Nav.Link>
                        <Nav.Link as={Link} to="/stories">Stories</Nav.Link>
                        <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}