import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrdenDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <ListGroupItem key={value}>
      {value} {key}
    </ListGroupItem>
  ));

  const toppingArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingArray.map((key) => (
    <ListGroupItem key={key}>{key}</ListGroupItem>
  ));

  return (
    <div>
      <h1>Order summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ListGroup>{scoopList}</ListGroup>
      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ListGroup>{toppingList}</ListGroup>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
