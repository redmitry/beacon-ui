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

import * as Yup from "yup";

const genomicQueryTypes = [
  "GeneID",
  "Genetic location (Range)",
  "Genetic location aprox (Bracket)",
  "Defined short variation (Sequence)",
  "Genomic Allele Query (HGVS)",
];

export default function GenomicQueryBuilderDialog({ open, handleClose }) {
  const [selectedQueryType, setSelectedQueryType] = useState(
    genomicQueryTypes[0]
  );

  const formComponentsMap = {
    GeneID: GeneIdForm,
    "Genetic location (Range)": GenomicLocationRage,
    "Genetic location aprox (Bracket)": GenomicLocationBracket,
    "Defined short variation (Sequence)": DefinedVariationSequence,
    "Genomic Allele Query (HGVS)": GenomicAlleleQuery,
  };

  const basePattern = /^[ACGTRYSWKMBDHVN.\-]+$/;

  const validationSchemaMap = {
    GeneID: Yup.object({
      geneId: Yup.string().required("Gene ID is required"),

      refBases: Yup.string()
        .matches(
          basePattern,
          "Only valid IUPAC codes (except U) and characters '.' or '-' are allowed"
        )
        .optional(),

      altBases: Yup.string()
        .matches(
          basePattern,
          "Only valid IUPAC codes (except U) and characters '.' or '-' are allowed"
        )
        .optional()
        .test(
          "not-equal-to-ref",
          "Ref and Alt bases must not be the same",
          function (value) {
            const { refBases } = this.parent;
            if (!refBases || !value) return true;
            return refBases !== value;
          }
        ),

      refAa: Yup.string().optional(),
      altAa: Yup.string().optional(),

      aaPosition: Yup.number()
        .typeError("Position must be a number")
        .integer("Position must be an integer")
        .min(1, "Position must be greater than 0")
        .optional(),

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
      assemblyId: Yup.string().required("Assembly ID is required"),
      chromosome: Yup.string().required("Chromosome is required"),
      start: Yup.number()
        .typeError("Start must be a number")
        .integer("Start must be an integer")
        .min(1, "Start must be greater than 0")
        .required("Start is required"),
      end: Yup.number()
        .typeError("End must be a number")
        .integer("End must be an integer")
        .min(1, "End must be greater than 0")
        .max(250_000_000, "End must be within a valid genomic range")
        .when("start", (start, schema) =>
          start
            ? schema.min(start, "End must be greater than or equal to Start")
            : schema
        )
        .required("End is required"),
      refBases: Yup.string()
        .matches(/^[ATCG]+$/, "Only A, T, C, G are allowed")
        .optional(),

      altBases: Yup.string()
        .matches(/^[ATCG]+$/, "Only A, T, C, G are allowed")
        .optional(),

      aaPosition: Yup.number()
        .typeError("Position must be a number")
        .integer("Position must be an integer")
        .min(1, "Position must be greater than 0")
        .max(30000, "Position must be within a valid protein length")
        .optional(),

      refAa: Yup.string().optional(), // Selected in the dropdown
      altAa: Yup.string().optional(), // Selected in the dropdown
      minVariantLength: Yup.number()
        .typeError("Must be a number")
        .integer("Must be an integer")
        .min(1, "Must be at least 1")
        .max(1000000, "Too large"),
      maxVariantLength: Yup.number()
        .typeError("Must be a number")
        .integer("Must be an integer")
        .min(1, "Must be at least 1")
        .max(1000000, "Too large")
        .test(
          "is-greater",
          "Max must be greater than or equal to Min",
          function (value) {
            const { minVariantLength } = this.parent;
            return !value || !minVariantLength || value >= minVariantLength;
          }
        ),
    }),
    "Genetic location aprox (Bracket)": Yup.object({
      assemblyId: Yup.string().required("Assembly ID is required"),
      chromosome: Yup.string().required("Chromosome is required"),
      start: Yup.number()
        .typeError("Start braket must be a number")
        .integer("Start braket must be an integer")
        .min(1, "Start braket must be greater than 0")
        .required("Start braket is required"),
      end: Yup.number()
        .typeError("End  braket must be a number")
        .integer("End braket must be an integer")
        .min(1, "End braket must be greater than 0")
        .max(250_000_000, "End braket must be within a valid genomic range")
        .when("start", (start, schema) =>
          start
            ? schema.min(
                start,
                "End braket must be greater than or equal to Start braket"
              )
            : schema
        )
        .required("End is required"),
    }),
    "Defined short variation (Sequence)": Yup.object({
      chromosome: Yup.string().required("Chromosome is required"),
      start: Yup.number()
        .typeError("Start braket must be a number")
        .integer("Start braket must be an integer")
        .min(1, "Start braket must be greater than 0")
        .required("Start braket is required"),
      refBases: Yup.string()
        .required("Reference Base is required")
        .matches(/^[ATCG]+$/, "Only A, T, C, G are allowed"),
      altBases: Yup.string()
        .required("Alternate Base is required")
        .matches(/^[ATCG]+$/, "Only A, T, C, G are allowed"),
    }),
    "Genomic Allele Query (HGVS)": Yup.object({
      genomicHGVSshortForm: Yup.string().required(
        "Genomic HGVS short form is required"
      ),
    }),
  };

  const SelectedFormComponent = formComponentsMap[selectedQueryType];

  return (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: '"Open Sans", sans-serif',
          }}
        >
          Genomic Query Builder
        </DialogTitle>
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

      <DialogContent sx={{ pt: 1 }}>
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
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({ resetForm, isValid, dirty }) => (
            <Form>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {genomicQueryTypes.map((label, index) => (
                  <StyledGenomicLabels
                    key={index}
                    label={label}
                    selected={selectedQueryType === label}
                    onClick={() => {
                      setSelectedQueryType(label);
                      resetForm();
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ mt: 4 }}>
                {SelectedFormComponent && <SelectedFormComponent />}
              </Box>

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
