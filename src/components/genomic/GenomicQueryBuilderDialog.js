import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledGenomicLabels from "../genomic/StyledGenomicLabels";
import GeneIdForm from "./GeneIdForm";
import GenomicSubmitButton from "../genomic/GenomicSubmitButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import config from "../../config/config.json";

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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {genomicQueryTypes.map((label, index) => (
            <StyledGenomicLabels
              key={index}
              label={label}
              selected={selectedQueryType === label}
              onClick={() => setSelectedQueryType(label)}
            />
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          {SelectedFormComponent && (
            <Formik
              initialValues={{
                geneId: "",
                assemblyId: config.assemblyId[0],
                variationType: "DEL (Copy Number Loss)",
              }}
              validationSchema={Yup.object({
                geneId: Yup.string().required("Gene ID is required"),
              })}
              onSubmit={(values) => {
                console.log("Form submitted:", values);
              }}
            >
              <Form>
                <SelectedFormComponent />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <GenomicSubmitButton />
                </Box>
              </Form>
            </Formik>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
