import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function AllFilteringTerms({ icon, label, selected, onClick }) {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
      sx={{
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: '"Open Sans", sans-serif',
        px: 2,
        py: 0.5,
        backgroundColor: selected ? "#E1EFFF" : "#F4F6F8",
        border: `1px solid ${selected ? "#3176B1" : "#DDE3EA"}`,
        color: selected ? "#3176B1" : "#1A1A1A",
        "&:hover": {
          backgroundColor: selected ? "#D0E7FF" : "#EAEFF3",
        },
      }}
    >
      {label}
    </Button>
  );
}

AllFilteringTerms.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
