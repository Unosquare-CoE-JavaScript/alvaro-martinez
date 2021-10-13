import { useOrderDetails } from '../../contexts/OrdenDetails';
import Options from './Options';

export default function OrderEntry() {
  const [ordenDetails, updateOrdenDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total {ordenDetails.totals.grandTotal}</h2>
    </div>
  );
}
