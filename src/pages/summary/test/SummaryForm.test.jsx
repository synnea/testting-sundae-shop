import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("the summary form", () => {
  beforeEach(() => {
    render(<SummaryForm />);
  });

  test("checkbox is initially unchecked", () => {
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    screen.logTestingPlaygroundURL();

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checkbox enables button on first click and disabled om second", () => {
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
  test("popover responds to hover", async () => {
    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // appears when we hover over checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    // popover disappears when we mouse out
    // the popover disappears asynchronously
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
