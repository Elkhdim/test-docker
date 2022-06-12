import axios from "axios";
import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import URL from '../../config'
function Login(props:any) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
      });

      const handleChange = (event:any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };

      const handleSubmit=(ev:any)=>{
        ev.preventDefault();
          axios.post(`${URL}/api/user/login`,{
              email:formValue.email,
              password:formValue.password
          }).then(res=>{
              props.userLogin(res.data.token,res.data.user)
          })
      }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
           
        <Form.Control type="email" name='email' onChange={handleChange} placeholder="Enter email" />
   
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' onChange={handleChange} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div>
          <Link to="/register">Register</Link>
          &nbsp;&nbsp;
          <Link to="/recoverpassword">Mot de passe oublié</Link>
      </div>
      
    </Form>
  );
}

const mapDispatchToProps=(dispatch:any)=>{
    return{
        userLogin:(token:any,user:any)=>{
            dispatch({
                type:'LOGIN_USER',
                token:token,
                user:user
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(Login);
