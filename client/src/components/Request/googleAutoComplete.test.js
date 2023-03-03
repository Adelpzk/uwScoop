import { TextField } from "@mui/material";
import React from "react";
import renderer from "react-test-renderer";
import GoogleAutoComplete from "./googleAutoComplete";


it("check for label", () => {
  const getByTestId = renderer.create(<GoogleAutoComplete label={"Test"} />);
  expect(getByTestId.root.findByType(TextField).props.label).toBe("Test");
});
