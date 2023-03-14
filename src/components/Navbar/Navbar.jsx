import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import { HiUsers } from "react-icons/hi";
import { BsYoutube } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';

function CollapsibleExample() {
  return (
    <Navbar id='Navbar_navbar' collapseOnSelect expand="lg" bg="grey" variant="grey">
      <Container id='container-general_navbar'>
        <Link id='Brand_navbar' href="#home" to='/'><img id='logo-salute__navbar' src='./images/logo-salute.png' /></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" id='items-nav__navbar'>
           
              <div id='container-linksPrincipales__navbar'>
                <Link className='item-link__navbar' to='/' >Inicio</Link>
                <Link className='item-link__navbar' to='/productos'  >Productos</Link>
                <NavDropdown className='item-link__navbar' title="Acerca de nosotros" id="collasible-nav-dropdown">
                  <div id='subContainer-dropdown__navbar'>
                    <Link className='item-link__navbar item-dropdown__navbar' to='/salute-tv' >
                      <BsYoutube className='icon-itemDropdown__navbar youtube-icono' />
                      <h3 className='texto-itemDropdown__navbar'>Salute TV</h3>
                    </Link>
                    <Link className='item-link__navbar item-dropdown__navbar' to='/zonas-entrega'>
                      <BiMap className='icon-itemDropdown__navbar map-icono' />
                      <h3 className='texto-itemDropdown__navbar'>Zonas en entrega</h3>
                    </Link>
                  </div>
                </NavDropdown>
                <Link className='item-link__navbar admin__navbar' to='/admin'><AiFillSetting id='tuerca-admin'/>Administrador</Link>
              </div>
              <div id='container-cierre-inicio__navbar'>
                <HiUsers id='logo-user__navbar' />
                <Link className='item-link__navbar' id='link-Inicio-Cerrar_navbar' to='/' > Iniciar Sesión </Link>
              </div>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;