import { Box, TextField } from "@mui/material";
import { useField } from "formik";
import { textFieldStyle, FieldLabel } from "../styling/genomicInputBoxStyling";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/*
  BaseInputBox is a reusable building block for rendering a labeled input field.
  - It displays a label (e.g., "Ref. Bases" or "Alt. Bases")
  - Shows validation errors if any
  - Applies consistent styling
*/
const BaseInputBox = ({
  fieldProps, // field bindings from Formik (e.g., name, value, onChange)
  metaProps, // metadata from Formik (e.g., error, touched)
  label, // label to show above the input
  placeholder, // placeholder text for the input field
  isDisabled, // whether the field is disabled
}) => (
  <Box sx={{ width: "100%" }}>
    <FieldLabel>{label}</FieldLabel>
    <TextField
      {...fieldProps}
      error={metaProps.touched && Boolean(metaProps.error)}
      helperText={metaProps.touched && metaProps.error}
      placeholder={placeholder}
      disabled={isDisabled}
      sx={{ ...textFieldStyle, width: "100%" }}
    />
  </Box>
);

/*
  BasesChangeFields displays two text inputs side-by-side:
  1. Ref. Bases (e.g. "A")
  2. Alt. Bases (e.g. "T")

  It connects both inputs to Formik, supports validation, 
  and uses BaseInputBox to reduce code repetition.
*/
export default function BasesChangeFields({
  isDisabled, // global toggle to disable inputs
  customRefLabel, // optional custom label for Ref
  customAltLabel, // optional custom label for Alt
  customRefPlaceholder, // optional placeholder for Ref
  customAltPlaceholder, // optional placeholder for Alt
  customPaddingTop, // optional spacing above arrow icon
}) {
  // Connect Ref. Base input to Formik
  const [refField, refMeta] = useField("refBases");

  // Connect Alt. Base input to Formik
  const [altField, altMeta] = useField("altBases");

  return (
    // Layout: horizontal row with 2 inputs and a right arrow in between
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <BaseInputBox
        fieldProps={refField}
        metaProps={refMeta}
        label={customRefLabel || "Ref. Bases"}
        placeholder={customRefPlaceholder || "T"}
        isDisabled={isDisabled}
      />

      {/* Arrow icon separating Ref and Alt */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pt: customPaddingTop || "8%",
        }}
      >
        <KeyboardArrowRightIcon sx={{ color: "#999", fontSize: "24px" }} />
      </Box>

      <BaseInputBox
        fieldProps={altField}
        metaProps={altMeta}
        label={customAltLabel || "Alt. Bases"}
        placeholder={customAltPlaceholder || "G"}
        isDisabled={isDisabled}
      />
    </Box>
  );
}
