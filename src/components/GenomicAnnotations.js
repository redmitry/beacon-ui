import { Chip, Box } from "@mui/material";

export default function GenomicAnnotations() {
  const annotations = ["SNPs", "CNVs", "Indels", "Gene Expression", "Pathway"];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {annotations.map((anno) => (
        <Chip
          key={anno}
          label={anno}
          onClick={() => console.log(anno)}
          sx={{ borderRadius: 1, bgcolor: "#e3f2fd" }}
        />
      ))}
    </Box>
  );
}
