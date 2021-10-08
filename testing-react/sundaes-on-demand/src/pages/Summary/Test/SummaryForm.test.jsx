import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('summaryform', () => {
  test('checknbox is unchecked in initial', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /i agree with the terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  });

  test('should enables button after checkbox is checked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /i agree with the terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', { name: 'confirm order' });

    expect(confirmButton).toBeDisabled();

    fireEvent.click(checkbox);

    expect(confirmButton).toBeEnabled();
  });
  test('should disables button after checkbox is unchecked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /i agree with the terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', { name: 'confirm order' });

    fireEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();
    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });
});
