import { useContext, useEffect, useState } from 'react'; 
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


function SignUp(){
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const [errors,setErrors]=useState({});
  const {Signup} = useContext(AuthContext);

  const [isNameValid, setIsNameValid] = useState(null); // null = not yet validated
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isConfirmValid, setIsConfirmValid] = useState(null);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIsNameValid(validateName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsConfirmValid(validatePassword(value));
  };

  const validateName = (value) => value.length > 3;
  const validateEmail = (value) =>/^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/.test(value);
  const validatePassword = (value) =>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
  const navigate= useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate('/home');
    }
    // eslint-disable-next-line
  },[])
  const submit =async ()=>{
    const response = await Signup({name,email,password}); 
    if(response.success){
      navigate("/login");
    }
    else{
      let error={};     
      error.email=response.message; 
     setErrors(error);
    }
  }

  const validate = (e)=>{
    e.preventDefault();
    let mail = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    let error={};
  
    let isValid = mail.test(email);  
    if(name.length<4||name.match(/\d/)!==null){
      error.name="*Please enter valid name";
    }
    else if(!isValid){
      error.email="*Please enter valid email";
    }
    else if(!passwordPattern.test(password)){
      error.password="*Please enter strong password";
    }
    else if(password!==confirmpassword){
      error.password="*Password does not match";
    }
    else{
      submit();
    }
    setErrors(error);
    return false;
  }

    return (
      <div className=' bg-secondary min-vh-100'>
      <Container  className='pt-5'>
        <div className='w-50 m-auto mt-5 border p-4 rounded bg-white'>
        <h2 className='text-center'>Sign Up</ h2>
      <Form >
      <Form.Group className="mb-3" controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter user name" className={isNameValid===null?"":isNameValid?"is-valid":"is-invalid"}  onChange={handleNameChange}/>
          <span className='text-danger'>{errors.name}</span> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  className={isEmailValid===null?"":isEmailValid?"is-valid":"is-invalid"}  onChange={handleEmailChange}/> 
          <span className='text-danger'>{errors.email}</span> 
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" className={isPasswordValid===null?"":isPasswordValid?"is-valid":"is-invalid"}  onChange={handlePasswordChange}/>
          <span className='text-danger'>{errors.password}</span> 
        </Form.Group> 
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" className={isConfirmValid===null?"":isConfirmValid?"is-valid":"is-invalid"}  onChange={handleConfirmPassword}/>
           
        </Form.Group> 
        <p>Already Have an account?<a href='/login'>Sign in</a> </p>
        <div className='d-block text-center'>
        <Button variant="primary" type="submit" onClick={validate}>
          Submit
        </Button>
        </div>

      </Form>
      </div>
      </Container>
      </div>
    );
 
}
export default SignUp;