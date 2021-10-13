import { rest } from 'msw';

import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import {
  render,
  waitFor,
  screen,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

test('should handle error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('should disable button if no scoops ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const scoopVanilla = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(scoopVanilla);
  userEvent.type(scoopVanilla, '1');

  expect(orderButton).toBeEnabled();

  userEvent.clear(scoopVanilla);
  userEvent.type(scoopVanilla, '0');

  expect(orderButton).toBeDisabled();
});
