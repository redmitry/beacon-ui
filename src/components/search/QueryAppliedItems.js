import { Box } from "@mui/material";
import FilterLabelRemovable from "../styling/FilterLabelRemovable";
import { useSelectedEntry } from "../context/SelectedEntryContext";

export default function QueryAppliedItems({ handleFilterRemove }) {
  const { selectedFilter } = useSelectedEntry();

  console.log("selectedFilter", selectedFilter);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {selectedFilter.map((filter) => (
        <FilterLabelRemovable
          key={filter.label}
          label={filter.label}
          scope={filter.scope}
          scopes={filter.scopes}
          onDelete={() => handleFilterRemove(filter)}
          onScopeChange={(newScope) => handleScopeChange(filter.key, newScope)}
          keyValue={filter.key}
          bgColor="common"
        />
      ))}
    </Box>
  );
}
