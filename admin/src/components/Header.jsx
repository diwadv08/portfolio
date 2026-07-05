import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { nav_links } from '../common/mylinks';
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const [isActive,setActive]=useState();
  const { isAuthenticated, username, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <Container fluid className='myHeaders mb-5'>
    <Navbar expand="lg" className="bg-dark navbar-dark py-2 myNavbar fixed-top w-100 headers px-2">
        <Navbar.Brand><Link to={"/"} onClick={()=>{setActive()}}>
        <h1 className='ms-4 text-success'>Diwa</h1>
        </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            {isAuthenticated && nav_links.map((e,index)=>{
                return <div key={index}>
                    <Link className={(isActive===e.name)?'active nav-link':'nav-link'} onClick={()=>{setActive(e.name)}} to={e.url} >{e.name}</Link>
                </div>
            })}

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle dark / light mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {isAuthenticated && (
              <button type="button" className="logout-btn" onClick={handleLogout} title={username ? `Signed in as ${username}` : 'Log out'}>
                <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </Container>

  );
}

export default Header;
