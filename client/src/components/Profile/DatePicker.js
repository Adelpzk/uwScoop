import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";


export default function DatePicker(props) {
  const [value, setValue] = React.useState(dayjs(props.defaultValue));

  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  const DatePicker = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        inputFormat="MM-DD-YYYY"
        maxDate={'2030-12-30'}
        value={value}
        onChange={handleChange}
        views={["year", "month", "day"]}
        InputAdornmentProps={{ position: "start" }}
        renderInput={(params) => (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              {...params}
              onChange={DatePicker}
              fullWidth
              error={props.error}
              label={props.label}
              style={{minWidth: 270 }}
              SelectProps={{
                native: true,
              }}
            />{" "}
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
