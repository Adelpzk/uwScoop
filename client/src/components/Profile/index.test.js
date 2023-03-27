import { TextField } from "@mui/material";
import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import DatePicker from "./DatePicker";
import YearDropdown from "./YearDropdown";

describe("Profile", () => {
  it("check for label", () => {
    const getByTestId = renderer.create(<DatePicker label={"Test"} />);
    expect(getByTestId.root.findByType(TextField).props.label).toBe("Test");
  });

  it("check year dropdown", () => {
    render(<YearDropdown />);
    expect(screen.getAllByText("Year")[0]).toBeInTheDocument();
  });
});
