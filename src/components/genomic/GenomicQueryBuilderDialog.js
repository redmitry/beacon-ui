import * as Yup from "yup";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledGenomicLabels from "./styling/StyledGenomicLabels";
import GeneIdForm from "./querybuilder/GeneIdForm";
import GenomicLocationRage from "./querybuilder/GenomicLocationRage";
import GenomicAlleleQuery from "./querybuilder/GenomicAlleleQuery";
import GenomicLocationBracket from "./querybuilder/GenomicLocationBracket";
import DefinedVariationSequence from "./querybuilder/DefinedVariationSequence";
import GenomicSubmitButton from "../genomic/GenomicSubmitButton";
import { Formik, Form } from "formik";
import {
  assemblyIdRequired,
  chromosomeValidator,
  createStartValidator,
  createEndValidator,
  refBasesValidator,
  altBasesValidator,
  refAaValidator,
  aaPositionValidator,
  altAaValidator,
  minVariantLength,
  maxVariantLength,
  assemblyIdOptional,
  requiredRefBases,
  requiredAltBases,
  genomicHGVSshortForm,
  geneId,
} from "../genomic/genomicQueryBuilderValidator";

// List of all query types shown as options in the UI
// Used to display the selection buttons and control which form is shown
const genomicQueryTypes = [
  "GeneID",
  "Genetic location (Range)",
  "Genetic location aprox (Bracket)",
  "Defined short variation (Sequence)",
  "Genomic Allele Query (HGVS)",
];

export default function GenomicQueryBuilderDialog({ open, handleClose }) {
  // This selectes on load the first query type, without user's interaction
  const [selectedQueryType, setSelectedQueryType] = useState(
    genomicQueryTypes[0]
  );

  // This map links each query type label to the corresponding form component
  // It tells the app which form to display based on the user's selection
  const formComponentsMap = {
    GeneID: GeneIdForm,
    "Genetic location (Range)": GenomicLocationRage,
    "Genetic location aprox (Bracket)": GenomicLocationBracket,
    "Defined short variation (Sequence)": DefinedVariationSequence,
    "Genomic Allele Query (HGVS)": GenomicAlleleQuery,
  };

  // The rules of the validation schema can be checked in the component: genomicQueryBuilderValidator
  const validationSchemaMap = {
    GeneID: Yup.object({
      geneId,
      refBases: refBasesValidator,
      altBases: altBasesValidator,
      refAa: refAaValidator,
      altAa: altAaValidator,
      aaPosition: aaPositionValidator,
      assemblyId: assemblyIdOptional,
      start: Yup.number()
        .typeError("Start must be a number")
        .integer("Start must be an integer")
        .optional(),
      end: Yup.number()
        .typeError("End must be a number")
        .integer("End must be an integer")
        .when("start", (start, schema) =>
          start
            ? schema.min(start, "End must be greater than or equal to Start")
            : schema
        )
        .optional(),
    }),
    "Genetic location (Range)": Yup.object({
      assemblyId: assemblyIdRequired,
      chromosome: chromosomeValidator.required("Chromosome is required"),
      start: createStartValidator("Start"),
      end: createEndValidator("End", "Start"),
      refBases: refBasesValidator,
      altBases: altBasesValidator,
      refAa: refAaValidator,
      altAa: altAaValidator,
      aaPosition: aaPositionValidator,
      minVariantLength,
      maxVariantLength,
    }),
    "Genetic location aprox (Bracket)": Yup.object({
      assemblyId: assemblyIdRequired,
      chromosome: chromosomeValidator.required("Chromosome is required"),
      start: createStartValidator("Start braket"),
      end: createEndValidator("End braket", "Start braket"),
    }),

    "Defined short variation (Sequence)": Yup.object({
      assemblyId: assemblyIdOptional,
      chromosome: chromosomeValidator.required("Chromosome is required"),
      start: createStartValidator("Start"),
      refBases: requiredRefBases,
      altBases: requiredAltBases,
    }),

    "Genomic Allele Query (HGVS)": Yup.object({
      genomicHGVSshortForm,
    }),
  };

  // Get the form component that matches the currently selected query type
  // This is used to render the correct form in the UI based on user's selection
  const SelectedFormComponent = formComponentsMap[selectedQueryType];

  return (
    // This is the empty dialog
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      {/* This is the box in which the title is contained */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title that is consistent across all query types */}
        <DialogTitle
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: '"Open Sans", sans-serif',
          }}
        >
          Genomic Query Builder
        </DialogTitle>
        {/* This is the icon to close the dialog + the dialog closes by tapping outside of it  */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ mr: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/*The dyamic content of the dialog starts here */}
      <DialogContent sx={{ pt: 1 }}>
        {/* This is the form wrapper that controls validation and submission, 
        it uses dynamic initial values as empty and validation schemas based on the
        selected query type */}
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            geneId: "",
            assemblyId: "",
            chromosome: "",
            start: "",
            end: "",
            variationType: "",
            basesChange: "",
            refBases: "",
            altBases: "",
            aminoacidChange: "",
            minVariantLength: "",
            maxVariantLength: "",
            genomicHGVSshortForm: "",
          }}
          validationSchema={validationSchemaMap[selectedQueryType]}
          // This handles the form submission
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({ resetForm, isValid, dirty }) => (
            <Form>
              {/* Render the selectable query type buttons */}
              {/* When a user clicks a button, the form type changes and the form is reset */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {genomicQueryTypes.map((label, index) => (
                  <StyledGenomicLabels
                    key={index}
                    label={label}
                    selected={selectedQueryType === label}
                    onClick={() => {
                      setSelectedQueryType(label);
                      resetForm(); // Clears the form when switching query type
                    }}
                  />
                ))}
              </Box>
              {/* Render the selected form based on the current query type based on user's selection */}
              <Box sx={{ mt: 4 }}>
                {SelectedFormComponent && <SelectedFormComponent />}
              </Box>
              {/* Submit button is shown at the bottom right of all the query types and is disabled if the form is invalid or untouched */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <GenomicSubmitButton disabled={!isValid || !dirty} />
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
