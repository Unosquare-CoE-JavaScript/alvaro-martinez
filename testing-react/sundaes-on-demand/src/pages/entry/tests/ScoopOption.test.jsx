import { render, screen } from '@testing-library/react';
import ScoopOption from '../ScoopOption';
import userEvent from '@testing-library/user-event';

test('should indicate if scoop count is not valid', async () => {
  render(<ScoopOption imagePath='' name='' updateItemCount={jest.fn()} />);

  const scoopInput = screen.getByRole('spinbutton');
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, '-1');

  expect(scoopInput).toHaveClass('is-invalid');

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, '1.5');

  expect(scoopInput).toHaveClass('is-invalid');

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, '11');

  expect(scoopInput).toHaveClass('is-invalid');
});
