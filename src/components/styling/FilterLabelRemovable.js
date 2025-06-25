import { Typography, Button, Box, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import config from "../../config/config.json";
import { capitalize } from "../common/textFormatting";

export default function FilterLabelRemovable({
  scope,
  scopes = [],
  label,
  onDelete,
  bgColor,
  stateSelected,
  keyValue,
  expandedKey,
  setExpandedKey,
  onScopeChange,
}) {
  const isExpanded = expandedKey === keyValue;

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

  const handleScopeChange = (newScope) => {
    onScopeChange(keyValue, newScope);
  };

  const labelToShow =
    scopes.length > 1 && scope ? `${label} | ${capitalize(scope)}` : label;

  return (
    <Box
      sx={{
        borderRadius: "8px",
        border: "1px solid black",
        fontWeight: 400,
        backgroundColor: isExpanded ? hoverColor : `${stateColor} !important`,
        padding: isExpanded ? "9px 12px" : "4px 12px",
        width: isExpanded ? "100%" : "auto",
        maxWidth: isExpanded ? "400px" : "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        maxHeight: isExpanded ? "auto" : 32,
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: `${hoverColor} !important`,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        onClick={() => {
          if (scopes.length > 1) {
            setExpandedKey(isExpanded ? null : keyValue);
          }
        }}
        sx={{
          cursor: scopes.length > 1 ? "pointer" : "default",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
          }}
        >
          {labelToShow}
        </Typography>
        <ClearIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            fontSize: 18,
            cursor: "pointer",
            opacity: 0.6,
            "&:hover": { opacity: 1 },
          }}
        />
      </Box>

      {isExpanded && (
        <Box
          mt={1}
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                borderColor: "black",
                width: "100%",
              }}
            />
          </Box>

          <Typography fontWeight={400} fontSize={13} mb={1} mt={1}>
            Select the scope:
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            {scopes.map((s) => {
              const isSelected = s === scope;

              return (
                <Button
                  key={s}
                  variant={isSelected ? "contained" : "outlined"}
                  onClick={() => handleScopeChange(s)}
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 400,
                    textTransform: "none",
                    fontSize: "12px",
                    minHeight: "28px",
                    boxShadow: "none",
                    display: "inline-block",
                    backgroundColor: isSelected
                      ? config.ui.colors.primary
                      : "#fff",
                    color: isSelected ? "#fff" : config.ui.colors.darkPrimary,
                    border: `1px solid ${
                      isSelected
                        ? config.ui.colors.primary
                        : config.ui.colors.darkPrimary
                    }`,
                    borderRadius: "7px",
                    fontSize: "12px",
                    px: 1.5,
                    py: 0.3,
                    mr: 1,
                    mb: 0.5,
                    fontFamily: '"Open Sans", sans-serif',
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {capitalize(s)}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
