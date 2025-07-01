import { Box } from "@mui/material";
import FilterLabelRemovable from "../styling/FilterLabelRemovable";
import { useSelectedEntry } from "../context/SelectedEntryContext";
import { useState } from "react";
import CommonMessage, {
  COMMON_MESSAGES,
} from "../../components/common/CommonMessage";

export default function QueryAppliedItems({ handleFilterRemove }) {
  const { selectedFilter, setSelectedFilter } = useSelectedEntry();

  const [expandedKey, setExpandedKey] = useState(false);
  const [message, setMessage] = useState(null);

  const handleScopeChange = (keyValue, newScope) => {
    const [baseKey, prevScope] = keyValue.split("__");

    const isDuplicate = selectedFilter.some(
      (filter) => filter.key === baseKey && filter.scope === newScope
    );

    if (isDuplicate) {
      setMessage(COMMON_MESSAGES.doubleFilter);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSelectedFilter((prevFilters) =>
      prevFilters.map((filter) =>
        filter.key === baseKey && filter.scope === prevScope
          ? { ...filter, scope: newScope }
          : filter
      )
    );

    setExpandedKey(null);
  };

  return (
    <Box>
      {message && (
        <Box sx={{ mt: 1, mb: 2 }}>
          <CommonMessage text={message} type="error" />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {selectedFilter.map((filter) => {
          const keyValue = `${filter.key}__${filter.scope}`;

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
    </Box>
  );
}
