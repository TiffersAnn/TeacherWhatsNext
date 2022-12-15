import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { getCurrentUser, logout } from '../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom";
import { getUserById } from '../Managers/UserProfileManager';

    

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { id } = useParams();
  
    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)
    const [user, setUser] = useState("");

    useEffect(
      () => {
          // getUserById(id).then((u) => {setUser(u)})
          const user1 = getCurrentUser()
          if(user1){
            setUser(user1)
          }
      }, [isLoggedIn]);

  return (
    <>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <div>
      <Navbar class="w3-monospace"style={{backgroundColor: '#cddbe7', fontWeight:"bold"}}>
        <NavbarBrand style={{color:'#203344', marginLeft:'20px', fontWeight:"bold", fontSize:'1rem'}}>Teacher, What's Next? ⏰</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginRight:'20px'}}>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem >
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
               { user.userTypeId == 1 ? 
               <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/activities">Activities</NavLink>
                </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/subjects">Subjects</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/grades">Grades</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/times">Times</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                  </NavItem>
                  </>
                  :
                  ""
                  }
                  <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {/* {isLoggedIn &&
              <>
                {user.userType?.userObject?.id == 1
                ?  <><NavItem>
                  <NavLink tag={RRNavLink} to="/activities">Activities</NavLink>
                </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/subjects">Subjects</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/grades">Grades</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/times">Times</NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                  </NavItem></>
                
                : ""
                }
              </>
            } */}
                   
            
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    </>
  );
}