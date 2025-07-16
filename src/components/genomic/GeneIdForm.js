import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography } from "@mui/material";
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
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 6,
          width: "100%",
          backgroundColor: "papayawhip",
        }}
      >
        <Box sx={{ width: "50%", backgroundColor: "lemonchiffon" }}>
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
            variant="h1"
            sx={{
              mb: 3,
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
        <Box
          sx={{
            width: "70%",
            justifyContent: "space-between",
            backgroundColor: "mistyrose",
          }}
        >
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
            variant="h1"
            sx={{
              mb: 3,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: primaryDarkColor,
            }}
          >
            Please select one:
          </Typography>
          <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "row",
            //   gap: 2,
            //   flexWrap: "wrap",
            // }}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap", // ❗ prevent wrapping
              gap: 2,
              width: "100%",
              justifyContent: "space-between", // distributes space evenly
            }}
          >
            <GenomicInputBox
              name="geneId"
              label="Gene ID"
              placeholder="ex. BRAF"
              required={false}
            />
            <GenomicInputBox
              name="geneId"
              label="Gene ID"
              placeholder="ex. BRAF"
              required={false}
            />
            <GenomicInputBox
              name="geneId"
              label="Gene ID"
              placeholder="ex. BRAF"
              required={false}
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              mt: 4,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: primaryDarkColor,
            }}
          >
            You can add the Genomic Location
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap", // ❗ prevent wrapping
              gap: 2,
              width: "100%",
              justifyContent: "space-between", // distributes space evenly
            }}
          >
            <GenomicInputBox
              name="assemblyId"
              label="Assembly ID"
              description="Select the reference genome:"
              options={config.assemblyId}
              required={false}
            />
            <GenomicInputBox
              name="Start"
              label="Start"
              description="Add the location start:"
              placeholder="ex. 7572837"
              required={false}
            />
            <GenomicInputBox
              name="End"
              label="End"
              description="Add the location end:"
              placeholder="ex. 7578641"
              required={false}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
}
