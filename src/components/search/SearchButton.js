import {
  Button
} from "@mui/material";
import { useEffect, useState } from "react";
import config from '../../config/config.json';
import SearchIcon from "@mui/icons-material/Search";
import { useSelectedEntry } from "../context/SelectedEntryContext";

export default function SearchButton() {
  const { 
    selectedFilter, 
    selectedPathSegment, 
    setLoadingData,
    setResultData 
  } = useSelectedEntry();

  const handleSearch = async () => {
     setLoadingData(true);
     setResultData([]);
    try {
      // TODO filters itemss
      const response = await fetch(`${config.apiUrl}/${selectedPathSegment}`);
      const data = await response.json();
      console.log("dataa. ", data);
      setResultData(data);
    } catch (error) {
      // TODO show msg to user!
      console.error("Search failed", error);
    } finally {
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