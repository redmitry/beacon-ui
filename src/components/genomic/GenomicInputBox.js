import { Box, TextField, Select, MenuItem, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import config from "../../config/config.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AMINO_ACIDS } from "../common/textFormatting";
import {
  selectStyle,
  textFieldStyle,
  FieldLabel,
  FieldHeader,
} from "./styling/genomicInputBoxStyling";

export default function GenomicInputBox({
  name,
  label,
  placeholder,
  description,
  required = false,
  options = [],
  isSelectable = false,
  isSelected = false,
  onSelect = () => {},
  endAdornmentLabel = "",
  customRefLabel,
  customAltLabel,
  customRefPlaceholder,
  customAltPlaceholder,
  customPaddingTop,
}) {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();
  const error = meta.touched && meta.error;
  const primaryDarkColor = config.ui.colors.darkPrimary;
  const isDisabled = isSelectable && !isSelected;

  const [refField, refMeta] = useField("refBases");
  const [altField, altMeta] = useField("altBases");
  const [aaPositionField, aaPositionMeta] = useField("aaPosition");

  const renderAminoAcidChangeFields = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <FieldLabel>Ref AA</FieldLabel>
        <Select
          fullWidth
          value={values.refAa || ""}
          onChange={(e) => setFieldValue("refAa", e.target.value)}
          disabled={isDisabled}
          IconComponent={KeyboardArrowDownIcon}
          sx={selectStyle}
        >
          {AMINO_ACIDS.map((aa) => (
            <MenuItem key={aa} value={aa} sx={{ fontSize: "12px" }}>
              {aa}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ flex: 1 }}>
        <FieldLabel>Position</FieldLabel>
        <TextField
          fullWidth
          {...aaPositionField}
          error={aaPositionMeta.touched && Boolean(aaPositionMeta.error)}
          helperText={aaPositionMeta.touched && aaPositionMeta.error}
          placeholder="600"
          disabled={isDisabled}
          sx={textFieldStyle}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <FieldLabel>Alt AA</FieldLabel>
        <Select
          fullWidth
          value={values.altAa || ""}
          onChange={(e) => setFieldValue("altAa", e.target.value)}
          disabled={isDisabled}
          IconComponent={KeyboardArrowDownIcon}
          sx={selectStyle}
        >
          {AMINO_ACIDS.map((aa) => (
            <MenuItem key={aa} value={aa} sx={{ fontSize: "12px" }}>
              {aa}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );

  const renderBasesChangeFields = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <FieldLabel>{customRefLabel || "Ref. Bases"}</FieldLabel>
        <TextField
          {...refField}
          error={refMeta.touched && Boolean(refMeta.error)}
          helperText={refMeta.touched && refMeta.error}
          placeholder={customRefPlaceholder || "T"}
          disabled={isDisabled}
          sx={{ ...textFieldStyle, width: "100%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pt: customPaddingTop || "8%",
        }}
      >
        <KeyboardArrowRightIcon sx={{ color: "#999", fontSize: "24px" }} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <FieldLabel>{customAltLabel || "Alt. Bases"}</FieldLabel>
        <TextField
          {...altField}
          error={altMeta.touched && Boolean(altMeta.error)}
          helperText={altMeta.touched && altMeta.error}
          placeholder={customAltPlaceholder || "G"}
          disabled={isDisabled}
          sx={{ ...textFieldStyle, width: "100%" }}
        />
      </Box>
    </Box>
  );

  const renderFieldByType = () => {
    if (name === "basesChange") return renderBasesChangeFields();
    if (name === "aminoacidChange") return renderAminoAcidChangeFields();
    if (options.length > 0) {
      return (
        <Select
          fullWidth
          IconComponent={KeyboardArrowDownIcon}
          displayEmpty
          {...field}
          onChange={(e) => helpers.setValue(e.target.value)}
          error={!!error}
          disabled={isDisabled}
          sx={{
            ...selectStyle,
            "& .MuiSelect-select": {
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "14px",
              color: field.value ? config.ui.colors.darkPrimary : "#999",
              padding: "12px 16px",
            },
          }}
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span
                style={{
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                {placeholder}
              </span>
            )
          }
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: "12px" }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      );
    }
    return (
      <TextField
        fullWidth
        placeholder={placeholder}
        {...field}
        error={!!error}
        helperText={error}
        disabled={isDisabled}
        sx={textFieldStyle}
        InputProps={{
          endAdornment: endAdornmentLabel ? (
            <Typography
              sx={{
                fontSize: "12px",
                color: primaryDarkColor,
                fontFamily: '"Open Sans", sans-serif',
                mr: 1,
              }}
            >
              {endAdornmentLabel}
            </Typography>
          ) : null,
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        border: `1px solid ${primaryDarkColor}`,
        borderRadius: "10px",
        padding: "12px",
        backgroundColor: isDisabled ? "#F0F0F0" : "white",
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <FieldHeader
        label={label}
        required={required}
        isSelectable={isSelectable}
        isSelected={isSelected}
        onSelect={onSelect}
      />
      {description && <FieldLabel>{description}</FieldLabel>}
      {renderFieldByType()}
    </Box>
  );
}
