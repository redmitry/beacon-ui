import { Box, Typography } from "@mui/material";
import GenomicInputBox from "../GenomicInputBox";
import { mainBoxTypography } from "../styling/genomicInputBoxStyling";

export default function GenomicAlleleQuery() {
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
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              ...mainBoxTypography,
              mt: 0,
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Main Parameters
          </Typography>
          <Typography
            sx={{
              ...mainBoxTypography,
              mt: 0,
            }}
          >
            You need to fill in the fields with a (*)
          </Typography>
          <GenomicInputBox
            name="genomicHGVSshortForm"
            label="Genomic HGVS short form"
            placeholder="ex. NM_004006.2:c.4375C>T"
            required={true}
          />
        </Box>
      </Box>
    </Box>
  );
}
