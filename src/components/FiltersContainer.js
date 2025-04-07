import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CommonFilters from "./CommonFilters";
import GenomicAnnotations from "./GenomicAnnotations";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`filter-tabpanel-${index}`}
      aria-labelledby={`filter-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function FiltersContainer() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 8px 11px 0px #9BA0AB24",
        maxWidth: "338px",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Filter tabs"
        sx={{
          minHeight: "32px",
          borderBottom: "1px solid #E0E0E0",
          mb: 0,
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab
          label="Common Filters"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            fontWeight: tabValue === 0 ? "bold" : "normal",
            color: tabValue === 0 ? "black" : "#9E9E9E",
            p: 0,
            mr: 3,
            minHeight: "32px",
            minWidth: "unset",
            "&.Mui-selected": {
              color: "black",
            },
          }}
        />
        <Tab
          label="Genomic Annotations"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            fontWeight: tabValue === 1 ? "bold" : "normal",
            color: tabValue === 1 ? "black" : "#9E9E9E",
            p: 0,
            minHeight: "32px",
            minWidth: "unset",
            "&.Mui-selected": {
              color: "black",
            },
          }}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "19px",
            mb: 0.5,
            color: "black",
          }}
        >
          Most Common Filters
        </Typography>
        <CommonFilters />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "19px",
            mb: 2,
            color: "black",
          }}
        >
          Genomic Annotations
        </Typography>
        <GenomicAnnotations />
      </TabPanel>
    </Box>
  );
}
