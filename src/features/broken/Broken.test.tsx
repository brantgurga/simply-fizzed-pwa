import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Broken from "./Broken";

test("displays title", () => {
  render(
    <MemoryRouter>
      <Broken />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /Broken/i })).toBeInTheDocument();
});
