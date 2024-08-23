import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { removeFromCart } from './cartSlice';
import { createCoursePayment, createConsultationPayment, createWorkshopPayment, checkPaymentStatus } from '../../api/paymentAuth';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getItemType = (item) => {
    if (item.courseId) return 'course';
    if (item.consultationId) return 'consultation';
    if (item.workshopId) return 'workshop';
    return 'item';
  };

  const handlePayNow = async (item) => {
    const type = getItemType(item);
    let paymentData;
  
    try {
      if (type === 'course') {
        paymentData = await createCoursePayment(userId, item.courseId);
      } else if (type === 'consultation') {
        paymentData = await createConsultationPayment(userId, item.consultationId);
      } else if (type === 'workshop') {
        paymentData = await createWorkshopPayment(userId, item.workshopId);
      }
  
      const { approvalUrl, payment } = paymentData;
      const orderId = payment.orderId;
  
      if (!orderId) {
        throw new Error('Order ID is undefined');
      }
  
      const newTab = window.open(approvalUrl, '_blank');
  
      const paymentCheckInterval = setInterval(async () => {
        if (newTab.closed) {
          clearInterval(paymentCheckInterval);
          const success = await checkPaymentStatus(orderId);
          if (success) {
            dispatch(removeFromCart({ id: item.courseId || item.consultationId || item.workshopId, type }));
            Swal.fire('Success', 'Payment was successful!', 'success');
            setPaymentSuccess(true);
          } else {
            Swal.fire('Error', 'Payment failed. Please try again.', 'error');
          }
        }
      }, 1000);
  
    } catch (error) {
      console.error("Error creating payment:", error);
      Swal.fire('Error', 'Something went wrong while creating the payment. Please try again.', 'error');
    }
  };

  const handleRemove = (id, type) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart({ id, type }));
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  return (
    <Container className="my-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Your Cart</h2>
        <Row className="gx-2 gy-3 justify-content-start">
          {cartItems.map((item) => {
            const id = item.courseId || item.consultationId || item.workshopId;
            const type = getItemType(item);

            return (
              <Col key={`${type}-${id}`} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                <Card className="h-100 shadow-sm" style={{ margin: "auto", width: "220px" }}>
                  {item.thumbnailImage && (
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8080/thumbnails/${item.thumbnailImage.split('\\').pop()}`}
                      alt={item.title}
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center" style={{ fontSize: "1rem" }}>{item.title}</Card.Title>
                    <Card.Text className="text-center flex-grow-1" style={{ fontSize: "0.875rem" }}>
                      ${Number(item.price).toFixed(2)}
                    </Card.Text>
                    <div className="cart-item-details">
                      {item.duration && <Card.Text><strong>Duration:</strong> {item.duration} minutes</Card.Text>}
                      {item.slotsPerUser && <Card.Text><strong>Slots:</strong> {item.slotsPerUser}</Card.Text>}
                      {item.startDate && <Card.Text><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</Card.Text>}
                      {item.endDate && <Card.Text><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</Card.Text>}
                      {item.startTime && <Card.Text><strong>Start Time:</strong> {item.startTime}</Card.Text>}
                      {item.endTime && <Card.Text><strong>End Time:</strong> {item.endTime}</Card.Text>}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-flex justify-content-between mb-2">
                      <Button
                        variant="success"
                        style={{ fontSize: "0.75rem", width: "48%" }}
                        onClick={() => handlePayNow(item)}
                      >
                        Pay Now
                      </Button>
                      <Button
                        variant="danger"
                        style={{ fontSize: "0.75rem", width: "48%" }}
                        onClick={() => handleRemove(id, type)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default Cart;
