import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";


export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <main className="container--login"
      style={{marginTop:"50px"}}>
    <Form className="form--login" onSubmit={loginSubmit}
      style={{display: "block",
      width: "75%",
      
      padding: ".75rem",
      marginLeft: "200px",
      fontSize: "1.5rem",
      lineHeight: "1.5",
      backgroundImage:'linear-gradient(to right, #667db6 0%, #0082c8 25%, #0082c8 50%, #667db6 100%)',
      
      border: "1px solid darkblue",
      borderRadius: ".55rem"
      }}>
      <h1 style={{marginLeft:"20px"}}>Teacher, What's Next?</h1>
      <h2 style={{marginLeft:"20px"}}>Please sign in</h2>
      <fieldset>
        <FormGroup>
          <Label for="email">Email:     </Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:     </Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button style={{border: "1px solid darkblue"}}>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </main>
  );
}
