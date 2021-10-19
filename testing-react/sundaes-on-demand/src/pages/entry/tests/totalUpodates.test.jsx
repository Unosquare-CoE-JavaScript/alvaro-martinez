import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('should update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);
  // make sure total starts out $0.00,
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check the subtotal
  const vainillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vainillaInput);
  userEvent.type(vainillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /Chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
test('should update toppings subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const toppingInputs = await screen.findByRole('checkbox', {
    name: /m&m/i,
  });
  userEvent.clear(toppingInputs);
  userEvent.click(toppingInputs);

  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const anotherTopping = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  userEvent.clear(anotherTopping);
  userEvent.click(anotherTopping);

  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(toppingInputs);
  expect(toppingsSubtotal).toHaveTextContent('1.5');
});

describe('grand total', () => {
  // test('should total starts at $0.00', () => {
  //   render(<OrderEntry />);

  //   const headingTotal = screen.getByRole('heading', { name: /grand total/i });
  //   expect(headingTotal).toHaveTextContent('0.00');
  // });
  test('should total udpates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const headingTotal = screen.getByRole('heading', { name: /grand total/i });
    expect(headingTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(headingTotal).toHaveTextContent('2.00');
  });
  test('should total udpates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const headingTotal = screen.getByRole('heading', { name: /grand total/i });
    expect(headingTotal).toHaveTextContent('0.00');

    const cherrieInput = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.click(cherrieInput);

    expect(headingTotal).toHaveTextContent('1.50');
  });
  test('should total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const headingTotal = screen.getByRole('heading', { name: /grand total/i });
    expect(headingTotal).toHaveTextContent('0.00');

    const cherrieInput = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.click(cherrieInput);
    expect(headingTotal).toHaveTextContent('1.50');

    userEvent.click(cherrieInput);

    expect(headingTotal).toHaveTextContent('0.00');
  });
});
