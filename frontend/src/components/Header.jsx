import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import myLinks from '../common/links';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const [isActive,setActive]=useState();
  const { theme, toggleTheme } = useTheme();
  let scrollSpeed=600;
  return (
    <Container fluid className='myHeaders bg-dark navbar-dark py-2'>
      <Container>
        <Navbar expand="lg" className="fixed-top bg-dark myNavbar">
        <Navbar.Brand><Link to={myLinks[0].toLowerCase()}   className='ms-4' offset={-70} duration={scrollSpeed} spy={true} smooth>Diwa</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {myLinks.map((e)=>{
                return <div key={e}>
                    <Link className={(isActive===e)?'active nav-link':'nav-link'} to={e.toLowerCase()} offset={-70} duration={scrollSpeed} spy={true} smooth>{e}</Link>
                </div>
            })}
            <button
              type="button"
              className="theme-toggle-btn ms-lg-3 mt-3 mx-3 mb-3"
              onClick={toggleTheme}
              aria-label="Toggle dark / light mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <a href="#">
            <i className='fa fa-chevron-up goToTop position-fixed'></i>
        </a>
      </Container>
    </Container>

  );
}

export default Header;
