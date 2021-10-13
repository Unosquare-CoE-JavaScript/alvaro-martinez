import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('should displays images for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((elem) => elem.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('should display images for each toopings option from server', async () => {
  render(<Options optionType='toppings' />);

  const toppingsImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map((elem) => elem.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('should dont update total if scoops input is invalid', async () => {
  render(<Options optionType='scoops' />);

  const scoopInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, '-1');

  expect(scoopInput).toHaveClass('is-invalid');

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});
