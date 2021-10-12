import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrdenDetails';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <Container className='App'>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
