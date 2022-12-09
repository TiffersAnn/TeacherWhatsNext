import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{backgroundColor: '#456f93'}}>
        <NavbarBrand style={{color:'#fff'}}>Teacher, What's Next?</NavbarBrand>
        {/* <NavbarToggler onClick={toggle} /> */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{color:'#fff', display:'flex', flexDirection:'row', justifyContent:'space-between', marginRight:'20px'}}>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem >
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/activities">Activities</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/subjects">Subjects</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/grades">Grades</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/times">Times</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar style={{color:'#fff'}}>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}