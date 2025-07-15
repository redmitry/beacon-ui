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

      {/* Dialog content goes here */}
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {genomicQueryTypes.map((label, index) => (
            <StyledGenomicLabels
              key={index}
              label={label}
              selected={selectedQueryType === label}
              onClick={() => setSelectedQueryType(label)}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
