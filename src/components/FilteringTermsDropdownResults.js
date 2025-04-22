import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import Fuse from "fuse.js";
import config from "../config/config.json";
const FilteringTermsDropdownResults = ({ searchInput }) => {
  const [allTerms, setAllTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const primaryDarkColor = config.ui.colors.darkPrimary;

  console.log("👀 Component Rendered. searchInput:", searchInput);

  useEffect(() => {
    const fetchFilteringTerms = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.apiUrl}/filtering_terms`);
        const data = await response.json();
        console.log("✅ API Response:", data);
        setAllTerms(data.response?.filteringTerms || []);
      } catch (err) {
        console.error("Error fetching terms:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchInput.length > 0 && allTerms.length === 0) {
      fetchFilteringTerms();
    }
  }, [searchInput, allTerms.length]);

  useEffect(() => {
    if (searchInput.length > 0 && allTerms.length > 0) {
      const fuse = new Fuse(allTerms, {
        keys: ["label", "id"],
        threshold: 0.3,
      });
      const results = fuse.search(searchInput).map((r) => r.item);
      console.log("🧠 Filtered Results:", results);
      setFilteredTerms(results);
    } else {
      setFilteredTerms([]);
    }
  }, [searchInput, allTerms]);

  if (searchInput.length === 0) return null;

  return (
    <Box
      fullWidth
      sx={{
        position: "absolute",
        width: "60%",
        zIndex: 3,
        cursor: "pointer",
      }}
    >
      {loading ? (
        <Box sx={{ p: 1 }}>
          <CircularProgress size={20} />
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
            <List>
              {filteredTerms.map((term) => (
                <ListItem key={term.id} button>
                  <ListItemText
                    primary={term.label}
                    secondary={term.id}
                    primaryTypographyProps={{ fontSize: "14px" }}
                    secondaryTypographyProps={{ fontSize: "12px" }}
                  />
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
