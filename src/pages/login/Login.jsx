import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


function Login() { 

    const [email,setEmail]=useState();
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({});
    const {Signin} = useContext(AuthContext);
    const navigate= useNavigate();
  
    const submit = async()=>{
      const response = await Signin({email,password}); 
    if(response.success){
      navigate("/home");
    }
    else{
      let error={};     
      error.password=response.message; 
     setErrors(error);
    }
    }
  
    const validate = (e)=>{
      e.preventDefault();
      let mail = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
      let error={};

      let isValid = mail.test(email);   
      if(!isValid){
        error.email="*Please enter valid email";
      }
      else if(password.length<8){
        error.password="*Password length should be atleast 8";
      }
      else{
        submit();
      }
      setErrors(error);
      return true;
    }

  return (
    <div className=' bg-secondary min-vh-100'>
    <Container  className='pt-5'>
    <div className='w-50 m-auto mt-5 border p-4 rounded bg-white'>
    <h2 className='text-center'>Login</ h2>
  <Form > 

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/> 
      <span className='text-danger'>{errors.email}</span> 
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password"  onChange={e=>setPassword(e.target.value)}/>
      <span className='text-danger'>{errors.password}</span> 
    </Form.Group> 
    <p>Don't Have an account?<a href='/'>Sign up</a> </p>
    <div className='d-block text-center'>
    <Button variant="primary" type="submit" onClick={validate}>
      Submit
    </Button>
    </div>

  </Form>
  </div>
  </Container>
  </div>
  )
}

export default Login;