import config from "../../config/config.json";
import { alpha } from "@mui/material/styles";

const hoverColor = alpha(config.ui.colors.primary, 0.05);

export const getSelectableScopeStyles = (isSelected) => ({
  borderRadius: "7px",
  fontWeight: 400,
  fontSize: "12px",
  px: 1.5,
  py: 0.3,
  mr: 1,
  mb: 0.5,
  fontFamily: '"Open Sans", sans-serif',
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  textTransform: "capitalize",
  backgroundColor: isSelected ? config.ui.colors.primary : "#fff",
  color: isSelected ? "#fff" : config.ui.colors.darkPrimary,
  border: `1px solid ${
    isSelected ? config.ui.colors.primary : config.ui.colors.darkPrimary
  }`,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: isSelected ? "none" : hoverColor,
  },
});
