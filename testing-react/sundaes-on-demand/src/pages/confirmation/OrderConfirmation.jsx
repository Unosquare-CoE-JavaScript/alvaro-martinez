import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrdenDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {});
  }, []);

  const handleClick = () => {
    resetOrder();

    setOrderPhase('inProgress');
  };
  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>

        <h2>Your order number is: {orderNumber}</h2>

        <Button type='submit' onClick={handleClick}>
          Create new Order
        </Button>
      </div>
    );
  }
  return <p>loading...</p>;
}
