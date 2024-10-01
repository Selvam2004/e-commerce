import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Category({details}) {
  console.log(details.name);
  return (
    <div>
    <Card style={{ width: '20rem' }} className='mb-3'>
      <Card.Img variant="top" style={{height:"18rem"}} src={details.imageUrl}/>
      <Card.Body>
        <Card.Title>{details.name}</Card.Title>
        <Card.Text>
          {details.description}
        </Card.Text> 
       <a href={'/home/product/'+details.name}> <Button variant="primary">View Products</Button></a>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Category