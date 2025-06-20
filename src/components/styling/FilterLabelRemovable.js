import { Chip } from "@mui/material";
import { alpha } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import config from "../../config/config.json";

export default function FilterLabelRemovable({
  scope,
  scopes = [],
  label,
  onDelete,
  bgColor,
}) {
  let backgroundColor = "";
  let hoverColor = "";

  if (bgColor === "common") {
    backgroundColor = alpha(config.ui.colors.primary, 0.05);
    hoverColor = alpha(config.ui.colors.primary, 0.15);
  } else if (bgColor === "genomic") {
    backgroundColor = alpha(config.ui.colors.secondary, 0.4);
    hoverColor = config.ui.colors.secondary;
  }

  // Show scope in the label or not
  const labelToShow =
    scopes.length > 1 && scope ? `${label} | ${scope}` : label;

  return (
    <Chip
      label={labelToShow}
      component="div"
      clickable
      variant="outlined"
      onDelete={onDelete}
      deleteIcon={<ClearIcon />}
      sx={{
        height: 32,
        borderRadius: "8px",
        border: "1px solid black",
        backgroundColor,
        fontSize: "14px",
        fontWeight: 400,
        transition: "background-color 0.2s ease",
        "&.MuiChip-clickable:hover": {
          backgroundColor: hoverColor,
        },
        "&.Mui-selected": {
          backgroundColor: hoverColor,
        },
      }}
    />
  );
}
