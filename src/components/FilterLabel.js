import { Chip } from "@mui/material";

export default function FilterLabel({ label, onClick, bgColor }) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      variant="outlined"
      sx={{
        height: 32,
        borderRadius: "8px",
        border: "1px solid black",
        backgroundColor: bgColor,
        fontSize: "14px",
        fontWeight: 400,
      }}
    />
  );
}
