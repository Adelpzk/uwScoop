import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Copyright from "./Copyright";

describe("ForgotPassword", () => {
  // moved copyright text out to a component Copyright.js
  // test that the text is correct
  it("copyright renders", () => {
    render(<Copyright />);
    expect(
      screen.getByText("Copyright © The Algorithm Avengers 2023.")
    ).toBeInTheDocument();
  });
});
