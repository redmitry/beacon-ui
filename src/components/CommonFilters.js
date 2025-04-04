import { Chip, Box } from "@mui/material";

export default function CommonFilters() {
  const filters = [
    "Female",
    "Male",
    "Age",
    "Weight",
    "Height",
    "Cancer",
    "COVID",
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          onClick={() => console.log(filter)}
          sx={{ borderRadius: 1 }}
        />
      ))}
    </Box>
  );
}
