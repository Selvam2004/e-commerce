import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Col, Container, Form, Pagination, Row } from 'react-bootstrap'
import Nav from '../home/Nav'
import axios from 'axios';
import '../../css/product.css'

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [product,setProduct]=useState([{}]);
  const [search,setSearch]=useState(""); 
  useEffect(()=>{
    if(search.length>2){
      axios.get(`${process.env.REACT_APP_API}/product/getElasticSearch?page=${currentPage}&pageSize=${pageSize}&search=${search}`)
      .then((res)=>{
          setProduct(res.data.updatedProducts);
          setTotalPages(res.data.totalPages);
      })
      .catch(err=>console.log(err.message));
    }
    else{
      axios.get(`${process.env.REACT_APP_API}/product/getProducts?page=${currentPage}&pageSize=${pageSize}`)
      .then((res)=>{
          setProduct(res.data.products);
          setTotalPages(res.data.totalPages);
      })
      .catch(err=>console.log(err.message));
    }

  },[currentPage,pageSize,search])

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
    if (rightEllipsis ) items.push(<Pagination.Ellipsis key="right-ellipsis" />);

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
        <h2 className='mt-3'>All Products:</h2> 
        <Row className='mb-4 mt-4'>
            <Col md={2}></Col>
            <Col md={7}> 
<div class="InputContainer">
  <input
    placeholder="Enter product name to search"
    id="input"
    class="input-pd"
    name="text"
    type="text"
    onChange={e=>setSearch(e.target.value)}
  />

  <label class="labelforsearch" for="input">
    <svg class="searchIcon" viewBox="0 0 512 512">
      <path
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      ></path>
    </svg>
  </label>
</div>

            </Col>
            <Col md={3}>
            <p className='ms-5 mt-2'>Limit:
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

        <Row className='m-auto' md={3}> 
          {product.length>0?product.map((data,i)=>{
           return( 
           <Col key={i}>
            <ProductCard  details={data}/> 
            </Col> 
           );
          }):<div className='m-auto'>"No results found"</div>}

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

export default AllProducts