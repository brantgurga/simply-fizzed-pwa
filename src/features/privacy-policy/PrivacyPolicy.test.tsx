import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "./PrivacyPolicy";

test("displays title", () => {
  render(<PrivacyPolicy />);

  expect(
    screen.getByRole("heading", { name: /Privacy Policy/i })
  ).toBeInTheDocument();
});
