import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('should', async () => {
  // render app
  render(<App />);

  // add ice cream scoop and toppings
  const vainillaItem = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vainillaItem);
  userEvent.type(vainillaItem, '2');

  const cherriItem = await screen.findByRole('checkbox', { name: /cherrie/i });
  userEvent.click(cherriItem);

  // find and click order button
  const orderButton = screen.getByText(/order sundae/i);
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryText = await screen.findByRole('heading', {
    name: /order summary/i,
  });
  expect(summaryText).toBeInTheDocument();

  const scoopsSubtotal = screen.getByRole('heading', { name: 'Scoops: $4.00' });
  expect(scoopsSubtotal).toBeInTheDocument();

  const toppingsSubtotal = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsSubtotal).toBeInTheDocument();

  // acept term and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditionsCheckbox);

  const orderConfirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(orderConfirmButton);

  //confirm order number on confirmation page
  const confirmPageText = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(confirmPageText).toBeInTheDocument();

  const orderNumber = await screen.findByRole('heading', { name: /123/i });
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  const toppingsTotal = await screen.findByText('Toppings total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();

  // do web need to wat anything to avoid test errors
});
