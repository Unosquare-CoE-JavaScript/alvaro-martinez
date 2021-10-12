import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

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
