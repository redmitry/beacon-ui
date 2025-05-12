import { Box } from "@mui/material";
import { useSelectedEntry } from "../context/SelectedEntryContext";

export default function ResultsContainer() {
  const { loadingData, resultData } = useSelectedEntry();

  return(
    <Box>
      
    </Box>
  )
}