// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '../Cart/cartSlice';
// import Swal from 'sweetalert2';

// const ConsultationOverview = ({ consultation }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addItemToCart(consultation));
//     Swal.fire({
//       icon: 'success',
//       title: 'Added to Cart',
//       text: `${consultation.title} has been added to your cart.`,
//     });
//   };

//   return (
//     <Container className="mt-3">
//       <Row className="justify-content-center">
//         <Col md={10}>
//           <Card className="mb-3">
//             <Row noGutters>
//               <Col md={8}>
//                 <Card.Body>
//                   <Card.Title>{consultation.title}</Card.Title>
//                   <Card.Text>{consultation.description}</Card.Text>
//                   <Card.Text><strong>Platform:</strong> {consultation.callPlatform}</Card.Text>
//                   <Card.Text><strong>Price:</strong> ${consultation.price}</Card.Text>
//                 </Card.Body>
//               </Col>
//               <Col md={4} className="d-flex align-items-center justify-content-center">
//                 <Button variant="primary" onClick={handleAddToCart}>
//                   Add to Cart
//                 </Button>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ConsultationOverview;
