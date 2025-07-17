import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import config from "../../config/config.json";
import GenomicInputBox from "../genomic/GenomicInputBox";

export default function GeneIdForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: { geneId: "" },
    validationSchema: Yup.object({
      geneId: Yup.string().required("Gene ID is required"),
    }),
    onSubmit,
  });

  const primaryDarkColor = config.ui.colors.darkPrimary;
  const [selectedInput, setSelectedInput] = useState("basesChange");

  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 6,
          width: "100%",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 700,
              fontSize: "14px",
              color: primaryDarkColor,
            }}
          >
            Main Parameters
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: primaryDarkColor,
            }}
          >
            You need to fill in the fields with a (*)
          </Typography>
          <GenomicInputBox
            name="geneId"
            label="Gene ID"
            placeholder="ex. BRAF"
            required={true}
          />
        </Box>

        <Box sx={{ width: "70%" }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 700,
              fontSize: "14px",
              color: primaryDarkColor,
            }}
          >
            Optional parameters
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: primaryDarkColor,
            }}
          >
            Please select one:
          </Typography>

          {/* Optional Input Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="variationType"
                label="Variation Type"
                description="Select the Variation Type"
                options={[
                  "DEL (Copy Number Loss)",
                  "SNP (Single Nucleotide Polymorphism)",
                  "DUP",
                  "BND",
                ]}
                isSelectable
                isSelected={selectedInput === "variationType"}
                onSelect={() => setSelectedInput("variationType")}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="basesChange"
                label="Bases Change"
                placeholder="ex. BRAF"
                isSelectable
                isSelected={selectedInput === "basesChange"}
                onSelect={() => setSelectedInput("basesChange")}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="aminoacidChange"
                label="Aminoacid Change"
                placeholder="ex. BRAF"
                isSelectable
                isSelected={selectedInput === "aminoacidChange"}
                onSelect={() => setSelectedInput("aminoacidChange")}
              />
            </Box>
          </Box>

          <Typography
            sx={{
              mb: 2,
              mt: 3,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: primaryDarkColor,
            }}
          >
            You can add the Genomic Location
          </Typography>

          {/* Genomic Location Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="assemblyId"
                label="Assembly ID"
                description="Select the reference genome:"
                options={config.assemblyId}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="Start"
                label="Start"
                description="Add the location start:"
                placeholder="ex. 7572837"
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <GenomicInputBox
                name="End"
                label="End"
                description="Add the location end:"
                placeholder="ex. 7578641"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
