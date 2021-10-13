import { Button, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrdenDetails';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }) {
  const [ordenDetails, updateOrdenDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total {ordenDetails.totals.grandTotal}</h2>
      <Button variant='primary' onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
}
