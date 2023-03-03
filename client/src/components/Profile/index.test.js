import { TextField } from "@mui/material";
import React from "react";
import renderer from "react-test-renderer";
import DatePicker from "./DatePicker";

it("check for label", () => {
  const getByTestId = renderer.create(<DatePicker label={"Test"} />);
  expect(getByTestId.root.findByType(TextField).props.label).toBe("Test");
});
