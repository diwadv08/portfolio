import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { nav_links } from '../common/mylinks';
import {Link} from "react-router-dom"
function Header() {
  const [isActive,setActive]=useState();
  let scrollSpeed=600;
  return (
    <Container fluid className='myHeaders mb-5'>
    <Navbar expand="lg" className="bg-dark navbar-dark py-2 myNavbar fixed-top w-100 headers px-2">
        <Navbar.Brand><Link to={nav_links[0].name.toLowerCase()}>
        <h1 className='ms-4 text-success'>Diwa</h1>
        </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {nav_links.map((e,index)=>{
                return <div key={index}>
                    <Link className={(isActive===e.name)?'active nav-link':'nav-link'} to={e.url} >{e.name}</Link>
                </div>
            })}
           
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </Container>

  );
}

export default Header;