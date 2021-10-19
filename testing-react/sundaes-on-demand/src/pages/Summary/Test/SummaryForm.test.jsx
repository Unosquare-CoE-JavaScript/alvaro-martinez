import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';
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

    userEvent.click(checkbox);

    expect(confirmButton).toBeEnabled();
  });
  test('should disables button after checkbox is unchecked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /i agree with the terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', { name: 'confirm order' });

    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();
    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  test('should popover respond to hover', async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    // popover appaers upon museovers of chechboc label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    // popover disappear when we mouse out
    userEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
