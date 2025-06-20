import { Button } from "@mui/material";
import PropTypes from "prop-types";
import config from "../../config/config.json";
import { lighten } from "@mui/system";
import { alpha } from "@mui/material/styles";

export default function AllFilteringTerms({
  scope,
  icon,
  label,
  selected,
  onClick,
}) {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
      sx={{
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: '"Open Sans", sans-serif',
        px: 2,
        py: 0.5,
        backgroundColor: selected ? selectedBg : "white",
        border: `1px solid ${
          selected ? primaryDarkColor : unselectedBorderColor
        }`,
        color: primaryDarkColor,
        "&:hover": {
          backgroundColor: selected ? selectedBg : lighten("#fff", 0.05),
          border: `1px solid ${primaryDarkColor}`,
        },
      }}
    >
      {label}
    </Button>
  );
}

const primaryColor = config.ui.colors.primary;
const unselectedBorderColor = alpha(primaryColor, 0.15);
const selectedBg = alpha(primaryColor, 0.15);
const primaryDarkColor = config.ui.colors.darkPrimary;
const selectedBgColor = lighten(primaryDarkColor, 0.9);

AllFilteringTerms.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
