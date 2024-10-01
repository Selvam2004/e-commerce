import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function ProductCard({details}) {  
  return (
    <div>
    <Card style={{ width: '21rem' ,height:"28rem" }} className='mb-4'>
      <Card.Img variant="top"  style={{height:"15rem"}}  src={details.imageUrl}/>
      <Card.Body>
        <Card.Title>{details.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><Badge bg="secondary">{details.categoryName}</Badge></Card.Subtitle>
        <Card.Text> 
           {details.description }<br/>
           <b>Original Price: </b>{details.originalPrice}<br/>
           <b>Discounted Price: </b>{details.discountPrice}<br/>
           <b>Current Stock: </b>{details.currentStock}<br/> 
        </Card.Text>  
      </Card.Body>
    </Card>
    </div>
  )
}


export default ProductCard