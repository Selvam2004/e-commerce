import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Col, Container,Pagination, Row } from 'react-bootstrap'
import Nav from '../home/Nav'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Product( ) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0); 
  const [product,setProduct]=useState([{}]);
  const {name} = useParams();

  useEffect(()=>{
     axios.get(`${process.env.REACT_APP_API}/product/getcategoryproducts/${name}?page=${currentPage}&pageSize=${pageSize}`)
     .then((res)=>{
         setProduct(res.data.updatedProducts); 
         setTotalPages(res.data.totalPages);   
     })
     .catch(err=>console.log(err.message));
     // eslint-disable-next-line 
  },[currentPage,pageSize]) 

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage- 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationItems = () => {
    let items = [];
    const leftEllipsis = currentPage > 3;
    const rightEllipsis = currentPage < totalPages - 1;

    // First page
    if (totalPages > 0 && currentPage!==1) items.push(
      <Pagination.Item key={1} active={currentPage === 1} onClick={() => setCurrentPage(1)}>
        {1}
      </Pagination.Item>
    );

    // Left ellipsis
    if (leftEllipsis) items.push(<Pagination.Ellipsis key="left-ellipsis" />);

    // Current, previous, and next pages
    if (currentPage > 2) {
      items.push(
        <Pagination.Item key={currentPage - 1}  onClick={() => setCurrentPage(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      );
    }
    
    items.push(
      <Pagination.Item key={currentPage} active>{currentPage}</Pagination.Item>
    );

    if (currentPage < totalPages) {
      items.push(
        <Pagination.Item key={currentPage + 1}   onClick={() => setCurrentPage(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      );
    }

    // Right ellipsis
    if (rightEllipsis&&currentPage<totalPages-2 ) items.push(<Pagination.Ellipsis key="right-ellipsis" />);

    // Last page
    if (totalPages > 1&&rightEllipsis) items.push(
      <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );

    return items;
  };


  return (
    <div>
          <Nav/>
    <Container> 
        <Row>

          <Col><h2 className='mt-3'>{name}:</h2></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
          <p className='ms-5 mt-4'>Limit:
                <select onChange={e=>setPageSize(e.target.value)}>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={15}>15</option>
                    <option value={21}>21</option>
                    <option value={30}>30</option>
                </select>
            </p> 
          </Col>
        </Row>
         
        <Row  className='m-auto'> 
          {product.map((data,i)=>{
           return( 
           <Col key={i}>
            <ProductCard  details={data}/> 
            </Col> 
           );
          })}

        </Row>
        <div className='mt-4 mb-5 w-25 ps-5 m-auto'> 
        <Pagination>
        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
        {renderPaginationItems()}
        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
      </Pagination>
      </div>
        
    </Container>
    <footer className='w-100 bg-primary p-3 '>  
      <p className='w-25 m-auto'>Copyright © 2024 . All rights Reserved</p>
    </footer>
    </div>
  )
}

export default Product