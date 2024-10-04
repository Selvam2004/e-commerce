 
import Container from 'react-bootstrap/Container';
import Nav from './Nav';
import Category from './Category';
import { Button, Col, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
 const [category,setCategory]=useState([{}]);
 const [currentPage, setCurrentPage] = useState(1); 
 const [pageSize, setPageSize] = useState(6);
 const [totalPages, setTotalPages] = useState(0);
 useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/category/getcategories?page=${currentPage}&pageSize=${pageSize}`)
    .then((res)=>{
        setCategory(res.data.categories); 
        setTotalPages(res.data.totalPages);
    })
    .catch(err=>console.log(err.message));
 },[])

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
    </>
  )
}
export default Home
