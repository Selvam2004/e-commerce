import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../../context/AuthProvider'; 
import { useContext } from 'react'; 
import { Container } from 'react-bootstrap';


const Nav = () => {
 const {Signout} = useContext(AuthContext); 
  return (
    <div>
    <Navbar className="bg-body-secondary">
      <Container>
        <Navbar.Brand href="#home">E-Commerce task</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"> 
          <button className='btn btn-success' onClick={Signout}>Log Out</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Nav