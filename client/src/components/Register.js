import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";

export default function Register({setIsLoggedIn}) {
    const navigate = useNavigate();
  
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
  
    const registerClick = (e) => {
      e.preventDefault();
      if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
      } else {
        const userProfile = { firstName, lastName, displayName, email };
        register(userProfile, password)
          .then(() => {
            setIsLoggedIn(true)
            navigate('/')
          });
      }
   };
  
    return (
      <>
      <h2 style={{marginLeft:"30px", marginTop:"30px"}}>Please Register</h2>
      <Form onSubmit={registerClick}
      style={{display: "block",
      width: "75%",
      marginTop:"50px",
      padding: ".75rem",
      marginLeft: "30px",
      fontSize: "1.5rem",
      lineHeight: "1.5",
      backgroundColor: "#6993b8",
      
      border: "1px solid darkblue",
      borderRadius: ".55rem"
      }}>
        
        <fieldset>
          <FormGroup>
            <Label htmlFor="firstName">First Name:    </Label>
            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name:     </Label>
            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Display Name:     </Label>
            <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:    </Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:     </Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password:     </Label>
            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
      </>
    );
  }