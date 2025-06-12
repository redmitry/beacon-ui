import React, { useEffect, useRef, useState } from "react";
import { Paper, List, ListItem, Box } from "@mui/material";
import config from "../../config/config.json";
import { useSelectedEntry } from "../context/SelectedEntryContext";
import CommonMessage from "../common/CommonMessage";
import useFilteringTerms from "../../hooks/useFilteringTerms";
import Loader from "../common/Loader";
import { searchFilteringTerms } from "../common/filteringTermsHelpers";

const FilteringTermsDropdownResults = ({ searchInput, onCloseDropdown }) => {
  const { setExtraFilter, setSelectedFilter } = useSelectedEntry();
  const [filteredTerms, setFilteredTerms] = useState([]);
  const { filteringTerms, loading } = useFilteringTerms();
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onCloseDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const primaryDarkColor = config.ui.colors.darkPrimary;

  useEffect(() => {
    if (searchInput.length > 0 && filteringTerms.length > 0) {
      const results = searchFilteringTerms(filteringTerms, searchInput);
      setFilteredTerms(results);
    } else {
      setFilteredTerms([]);
    }
  }, [searchInput, filteringTerms]);

  if (searchInput.length === 0) return null;

  return (
    <Box
      fullWidth
      ref={containerRef}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        zIndex: 5,
      }}
    >
      {loading ? (
        <Box sx={{ p: 1 }}>
          <Loader message="Loading filtering terms..." />
        </Box>
      ) : (
        filteredTerms.length > 0 && (
          <Paper
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              mt: 1,
              borderRadius: "21px",
              backgroundColor: "white",
              boxShadow: "none",
              border: `1px solid ${primaryDarkColor}`,
            }}
          >
            <List disablePadding>
              {filteredTerms.map((term, index) => (
                <ListItem
                  key={term.id}
                  button
                  onClick={() => {
                    const item = {
                      key: term.id,
                      label: term.label || term.id,
                      type: term.type,
                      scope: term.scopes?.[0],
                    };

                    if (item.type === "alphanumeric") {
                      setExtraFilter(item);
                      return;
                    }

                    setSelectedFilter((prev) => {
                      const alreadyExists = prev.some(
                        (f) => f.key === item.key
                      );
                      if (alreadyExists) return prev;
                      return [...prev, item];
                    });
                    onCloseDropdown();
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:
                      index !== filteredTerms.length - 1
                        ? "1px solid #E0E0E0"
                        : "none",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "12px",
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#000",
                    }}
                  >
                    {term.label}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "12px",
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#666",
                    }}
                  >
                    {term.id}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        )
      )}
    </Box>
  );
};

export default FilteringTermsDropdownResults;
