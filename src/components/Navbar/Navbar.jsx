import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import { HiUsers } from "react-icons/hi";

function CollapsibleExample() {
  return (
    <Navbar id='Navbar_navbar' collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container id='container-general_navbar'>
        <Navbar.Brand id='Brand_navbar' href="#home"><img id='logo-salute__navbar' src='./images/logo-salute.png' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" id='items-nav__navbar'>
            <div id='container-items-links__navbar'>
              <div id='container-linksPrincipales__navbar'>
                <Nav.Link href="#features">Inicio</Nav.Link>
                <Nav.Link href="#pricing">Productos</Nav.Link>
                <NavDropdown title="Acerca de nosotros" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Salute TV</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Zonas de entrega</NavDropdown.Item>
                </NavDropdown>
              </div>
              <div id='container-cierre-inicio__navbar'>
                <HiUsers id='logo-user__navbar'/>
                <Nav.Link href="#features" id='link-Inicio-Cerrar_navbar'> Iniciar Sesión </Nav.Link>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;