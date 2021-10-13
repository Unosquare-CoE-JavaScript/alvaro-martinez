import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrdenDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/Summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('InProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
      break;
  }
  return (
    <Container className='App'>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
