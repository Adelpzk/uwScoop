import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function YearDropdown({ year, setYear }) {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Year</InputLabel>
      <Select
        value={year ? year : "1A"}
        label="Year"
        onChange={(event) => setYear(event.target.value)}
        defaultValue={year}
      >
        <MenuItem value={"1A"}>1A</MenuItem>
        <MenuItem value={"1B"}>1B</MenuItem>
        <MenuItem value={"2A"}>2A</MenuItem>
        <MenuItem value={"2B"}>2B</MenuItem>
        <MenuItem value={"3A"}>3A</MenuItem>
        <MenuItem value={"3B"}>3B</MenuItem>
        <MenuItem value={"4A"}>4A</MenuItem>
        <MenuItem value={"4B"}>4B</MenuItem>
        <MenuItem value={"Masters"}>Masters</MenuItem>
        <MenuItem value={"PhD"}>PhD</MenuItem>
        <MenuItem value={"Intructor"}>Instructor</MenuItem>
      </Select>
    </FormControl>
  );
}
