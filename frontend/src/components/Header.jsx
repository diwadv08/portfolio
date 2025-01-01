import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import myLinks from '../common/links';
import { Link } from 'react-scroll';
function Header() {
  const [isActive,setActive]=useState();
  let scrollSpeed=600;
  return (
    <Container fluid className='myHeaders'>
    <Navbar expand="lg" className="bg-dark navbar-dark py-2 myNavbar fixed-top w-100">
        <Navbar.Brand><Link to={myLinks[0].toLowerCase()}   className='ms-4' offset={-70} duration={scrollSpeed} spy={true} smooth>Diwa</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {myLinks.map((e)=>{
                return <div key={e}>
                    <Link className={(isActive===e)?'active nav-link':'nav-link'} to={e.toLowerCase()} offset={-35} duration={scrollSpeed} spy={true} smooth>{e}</Link>
                </div>
            })}
           
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </Container>

  );
}

export default Header;