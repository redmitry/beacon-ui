import {
  Button
} from "@mui/material";
import { useEffect, useState } from "react";
import config from '../../config/config.json';
import SearchIcon from "@mui/icons-material/Search";
import { useSelectedEntry } from "../context/SelectedEntryContext";
import { info } from "autoprefixer";

export default function SearchButton() {
  const { 
    selectedFilter, 
    selectedPathSegment, 
    setLoadingData,
    setResultData,
    setHasSearchResult 
  } = useSelectedEntry();

  const handleSearch = async () => {
     setLoadingData(true);
     setResultData([]);
    try {
      // TODO filters itemss
      const response = await fetch(`${config.apiUrlNetwork}/${selectedPathSegment}`);
      const data = await response.json();

      // group beacons
      const groupedArray = Object.values(
        Object.values(data.response.resultSets).reduce((acc, item) => {
          if (!acc[item.beaconId]) {
            acc[item.beaconId] = {
              beaconId: item.beaconId,
              exists: item.exists,
              info: item.info,
              totalResultsCount: 0,
              items: []
            };
          }

          const count = Number(item.resultsCount) || 0;
          acc[item.beaconId].totalResultsCount += count;

          if (Array.isArray(item.results)) {
            acc[item.beaconId].items.push({
              dataset: item.id,
              results: item.results
            });
          }

          return acc;
        }, {})
      );

      setResultData(groupedArray);
    } catch (error) {
      // TODO show msg to user!
      console.error("Search failed", error);
    } finally {
      setHasSearchResult(true)
      setLoadingData(false);
    }
  }
  
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "14px",
        pl: 2,
        ml: 2,
        backgroundColor: config.ui.colors.primary,
        border: `1px solid ${config.ui.colors.primary}`,
        boxShadow: 'none',
        "&:hover": {
          backgroundColor: 'white',
          border: `1px solid ${config.ui.colors.primary}`,
          color: config.ui.colors.primary
        },
      }}
      startIcon={ <SearchIcon /> }
      onClick={ handleSearch }
    >
      Search
    </Button>
  )
}