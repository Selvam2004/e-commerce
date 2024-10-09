import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function ProductCard({details}) {  
  return (
    <div>
    <Card style={{ width: '21rem' ,height:"28rem" }} className='mb-4'>
      <Card.Img variant="top"  style={{height:"15rem"}}  src={"data:image/png;base64,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"}/>
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