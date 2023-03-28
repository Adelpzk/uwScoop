import { render, screen } from "@testing-library/react";
import { Button } from "@mui/material";
import "@testing-library/jest-dom";

describe("StartButton", () => {
  it("get started renders", () => {
    render(<Button>Get Started</Button>);
    expect(
      screen.getByText("Get Started")
    ).toBeInTheDocument();
  });
});
