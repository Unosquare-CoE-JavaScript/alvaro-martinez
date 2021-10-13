import { Button, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrdenDetails';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }) {
  const [ordenDetails] = useOrderDetails();

  const disabledButton = ordenDetails.totals.scoops === '$0.00';
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total {ordenDetails.totals.grandTotal}</h2>
      <Button
        disabled={disabledButton}
        variant='primary'
        onClick={() => setOrderPhase('review')}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
