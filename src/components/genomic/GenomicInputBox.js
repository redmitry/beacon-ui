import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useField } from "formik";
import config from "../../config/config.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function GenomicInputBox({
  name,
  label,
  placeholder,
  description,
  required = false,
  options = [],
}) {
  const [field, meta, helpers] = useField(name);
  const error = meta.touched && meta.error;
  const primaryDarkColor = config.ui.colors.darkPrimary;

  return (
    <Box
      sx={{
        border: `1px solid ${primaryDarkColor}`,
        borderRadius: "10px",
        padding: "16px",
        backgroundColor: "white",
      }}
    >
      {/* Label */}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: "14px",
          mb: 2,
          color: primaryDarkColor,
        }}
      >
        {label} {required && <span style={{ color: primaryDarkColor }}>*</span>}
      </Typography>

      {/* Optional description */}
      {description && (
        <Typography
          sx={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 400,
            fontSize: "14px",
            color: primaryDarkColor,
            mb: 1,
            mt: "-4px",
          }}
        >
          {description}
        </Typography>
      )}

      {/* Conditionally render either Select or TextField */}
      {options.length > 0 ? (
        <Select
          fullWidth
          IconComponent={KeyboardArrowDownIcon}
          {...field}
          onChange={(e) => helpers.setValue(e.target.value)}
          error={!!error}
          sx={{
            backgroundColor: "#F5FAFE",
            borderRadius: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "14px",
              padding: "12px 16px",
              color: primaryDarkColor,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: "14px" }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          fullWidth
          placeholder={placeholder}
          {...field}
          error={!!error}
          helperText={error}
          sx={{
            backgroundColor: "#F5FAFE",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
            "& input": {
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "14px",
              color: primaryDarkColor,
              padding: "12px 16px",
            },
          }}
        />
      )}

      {error && (
        <Typography sx={{ fontSize: "12px", color: "red", mt: "4px" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
