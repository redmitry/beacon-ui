import { Box, TextField, Select, MenuItem } from "@mui/material";
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
} from "./genomicInputBoxStyling";

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
}) {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();
  const error = meta.touched && meta.error;
  const primaryDarkColor = config.ui.colors.darkPrimary;

  const isDisabled = isSelectable && !isSelected;

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
          value={values.aaPosition || ""}
          onChange={(e) => setFieldValue("aaPosition", e.target.value)}
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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <FieldLabel>Ref. Bases</FieldLabel>
        <TextField
          value={values.refBases || ""}
          onChange={(e) => setFieldValue("refBases", e.target.value)}
          placeholder="T"
          disabled={isDisabled}
          sx={textFieldStyle}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", pt: "8%" }}>
        <KeyboardArrowRightIcon sx={{ color: "#999", fontSize: "24px" }} />
      </Box>
      <Box>
        <FieldLabel>Alt. Bases</FieldLabel>
        <TextField
          value={values.altBases || ""}
          onChange={(e) => setFieldValue("altBases", e.target.value)}
          placeholder="G"
          disabled={isDisabled}
          sx={textFieldStyle}
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
          {...field}
          onChange={(e) => helpers.setValue(e.target.value)}
          error={!!error}
          disabled={isDisabled}
          sx={selectStyle}
        >
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
