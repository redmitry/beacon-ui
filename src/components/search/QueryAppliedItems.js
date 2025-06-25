import { Box } from "@mui/material";
import FilterLabelRemovable from "../styling/FilterLabelRemovable";
import { useSelectedEntry } from "../context/SelectedEntryContext";
import { useState } from "react";

export default function QueryAppliedItems({ handleFilterRemove }) {
  const { selectedFilter, setSelectedFilter } = useSelectedEntry();

  const [expandedKey, setExpandedKey] = useState(false);

  console.log("selectedFilter", selectedFilter);

  const handleScopeChange = (keyValue, newScope) => {
    setSelectedFilter((prevFilters) =>
      prevFilters.map((f) =>
        f.key === keyValue ? { ...f, scope: newScope } : f
      )
    );
    setExpandedKey(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {selectedFilter.map((filter) => {
        const keyValue = filter.key;

        return (
          <FilterLabelRemovable
            key={keyValue}
            keyValue={keyValue}
            label={filter.label}
            scope={filter.scope}
            scopes={filter.scopes}
            onDelete={() => handleFilterRemove(filter)}
            onScopeChange={handleScopeChange}
            bgColor="common"
            expandedKey={expandedKey}
            setExpandedKey={setExpandedKey}
          />
        );
      })}
    </Box>
  );
}
