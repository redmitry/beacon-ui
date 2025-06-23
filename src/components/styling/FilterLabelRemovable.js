import { Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import config from "../../config/config.json";
import ScopeSelector from "../filters/ScopeSelector";
import { useSelectedEntry } from "../context/SelectedEntryContext";
import { capitalize } from "../common/textFormatting";

export default function FilterLabelRemovable({
  scope,
  scopes = [],
  label,
  onDelete,
  bgColor,
  stateSelected,
  keyValue,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setSelectedFilter } = useSelectedEntry();

  const backgroundColor =
    bgColor === "common"
      ? alpha(config.ui.colors.primary, 0.05)
      : alpha(config.ui.colors.secondary, 0.4);

  const hoverColor =
    bgColor === "common"
      ? alpha(config.ui.colors.primary, 0.15)
      : config.ui.colors.secondary;

  const stateColor = stateSelected
    ? alpha(config.ui.colors.primary, 0.25)
    : backgroundColor;

  const labelToShow =
    scopes.length > 1 && scope ? `${label} | ${capitalize(scope)}` : label;

  {
    capitalize(scope);
  }

  const handleChipClick = (event) => {
    if (scopes.length > 1) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleScopeChange = (newScope) => {
    setSelectedFilter((prevFilters) =>
      prevFilters.map((f) =>
        f.key === keyValue ? { ...f, scope: newScope } : f
      )
    );
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        label={labelToShow}
        component="div"
        clickable={scopes.length > 1}
        variant="outlined"
        onClick={handleChipClick}
        onDelete={onDelete}
        deleteIcon={<ClearIcon />}
        sx={{
          height: 32,
          borderRadius: "8px",
          border: "1px solid black",
          fontSize: "14px",
          fontWeight: 400,
          backgroundColor: `${stateColor} !important`,
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: `${hoverColor} !important`,
          },
        }}
      />

      <ScopeSelector
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        scopes={scopes}
        selectedScope={scope}
        onScopeChange={handleScopeChange}
      />
    </>
  );
}
