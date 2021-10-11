import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('should displays images for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm añt text of images
  const altText = scoopImages.map((elem) => elem.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vainilla scoop']);
});
