import { Box } from "@mui/material";
import QueryAppliedItems from '../search/QueryAppliedItems';

export default function ResultsFilters() {
  return (
    <Box
      sx={{
        p: 2
      }}>
      <QueryAppliedItems />
    </Box>
  )
}