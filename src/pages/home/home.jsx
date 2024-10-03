 
import Container from 'react-bootstrap/Container';
import Nav from './Nav';
import Category from './Category';
import { Button, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
 const [category,setCategory]=useState([{}]);
 useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/category/getcategories`)
    .then((res)=>{
        setCategory(res.data); 
    })
    .catch(err=>console.log(err.message));
 },[])
  return (
    <> 
    <Nav/>
    <Container>
        <h2 className='mt-4 mb-4'>
        <div className="float-start">All Categories:</div> 
        <div className="float-end"><a href="/home/allproducts"><Button variant="primary">View all Products</Button></a></div> <br/>
        </h2>
       
        <Row  className='m-auto'> 
          {category.map((data,i)=>{
           return(
            <Col key={i}>
            <Category details={data}/> 
            </Col> 
           );
          })}

        </Row>
        
    </Container>
    <footer className='w-100 bg-primary p-3 '>  
      <p className='w-25 m-auto'>Copyright © 2024 . All rights Reserved</p>
    </footer>
    </>
  )
}
export default Home
