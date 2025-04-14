import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  Button,
  CircularProgress,
  InputBase,
} from "@mui/material";
import config from "../config/config.json";
import { darken, lighten } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useSelectedEntry } from "./context/SelectedEntryContext";

export default function Search() {
  const [entryTypes, setEntryTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInput, setActiveInput] = useState(null);
  const { selectedPathSegment, setSelectedPathSegment } = useSelectedEntry();

  const configuredOrder = config.ui.entryTypesOrder;

  const sortEntries = (entries) =>
    configuredOrder?.length > 0 && entries.length > 1
      ? [...entries].sort(
          (a, b) =>
            configuredOrder.indexOf(a.pathSegment) -
            configuredOrder.indexOf(b.pathSegment)
        )
      : entries;

  useEffect(() => {
    const fetchEntryTypes = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/map`);
        const data = await res.json();
        const endpointSets = data.response.endpointSets || {};

        const entries = Object.entries(endpointSets).map(([key, value]) => {
          const pathSegment = value.rootUrl?.split("/").pop();
          return { id: key, pathSegment };
        });

        const sorted = sortEntries(entries);
        setEntryTypes(sorted);

        if (sorted.length > 0) {
          setSelectedPathSegment(sorted[0].pathSegment);
        }
      } catch (err) {
        console.error("Error fetching entry types:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryTypes();
  }, []);

  useEffect(() => {
    setActiveInput(selectedPathSegment === "g_variants" ? "genomic" : "filter");
  }, [selectedPathSegment]);

  const selectedEntry = entryTypes.find(
    (e) => e.pathSegment === selectedPathSegment
  );

  const isGenomicFirstOrOnly =
    entryTypes.length === 1 ||
    entryTypes[0]?.pathSegment === "g_variants" ||
    selectedPathSegment === "g_variants";

  const formatEntryLabel = (segment) => {
    if (!segment) return "Unknown";
    return segment === "g_variants"
      ? "Genomic Variants"
      : segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const primaryColor = config.ui.colors.primary;
  const primaryDarkColor = config.ui.colors.darkPrimary;
  const selectedBgColor = lighten(primaryDarkColor, 0.9);

  const entryTypeDescriptions = {
    analyses: "Text for analysis",
    biosamples: "query biosample data (e.g. histological samples).",
    cohorts: "Text for cohort",
    datasets: "Text for dataset",
    g_variants: "query genomic variants across individuals.",
    individuals: "query individual-level data (e.g. phenotypes, ancestry).",
    runs: "Text for run",
  };

  const renderInput = (type) => (
    <Box
      onClick={() => setActiveInput(type)}
      sx={{
        flex: activeInput === type ? 1 : 0.3,
        display: "flex",
        alignItems: "center",
        border: `1.5px solid ${primaryDarkColor}`,
        borderRadius: "999px",
        px: 2,
        py: 1,
        cursor: "text",
        backgroundColor: "#fff",
        transition: "flex 0.3s ease",
      }}
    >
      <SearchIcon sx={{ color: primaryDarkColor, mr: 1 }} />
      <InputBase
        placeholder={
          type === "genomic" ? "Genomic Query" : "Search by Filtering Terms"
        }
        fullWidth
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: "14px",
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        mazWidth: "1056px",
        mb: 6,
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 11px 0px #9BA0AB24",
        p: "24px 32px",
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: 700,
          fontFamily: '"Open Sans", sans-serif',
          fontSize: "14px",
        }}
      >
        Search
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="body1"
          sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: "14px" }}
        >
          1. Choose the <b>result type</b> for your search.
        </Typography>

        <Tooltip
          title={
            <Box
              component="ul"
              sx={{ pl: "20px", fontFamily: '"Open Sans", sans-serif' }}
            >
              {entryTypes.map((entry) => (
                <li key={entry.pathSegment}>
                  <b>{formatEntryLabel(entry.pathSegment)}</b>:{" "}
                  {entryTypeDescriptions[entry.pathSegment] ||
                    `No description for ${entry.pathSegment}`}
                </li>
              ))}
            </Box>
          }
          placement="top-start"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid black",
                minWidth: "400px",
              },
            },
            arrow: {
              sx: { color: "#fff", "&::before": { border: "1px solid black" } },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              cursor: "pointer",
              ml: 3,
              mb: "4px",
              width: "20px",
              height: "20px",
              borderRadius: "30px",
              backgroundColor: primaryColor,
              color: "white",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            i
          </Box>
        </Tooltip>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {entryTypes.map((entry) => (
            <Button
              key={entry.id}
              onClick={() => setSelectedPathSegment(entry.pathSegment)}
              variant="outlined"
              sx={{
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                fontFamily: '"Open Sans", sans-serif',
                fontSize: "14px",
                backgroundColor:
                  selectedPathSegment === entry.pathSegment
                    ? selectedBgColor
                    : "#FFFFFF",
                color:
                  selectedPathSegment === entry.pathSegment
                    ? "black"
                    : primaryColor,
                border: `1px solid ${
                  selectedPathSegment === entry.pathSegment
                    ? "black"
                    : primaryColor
                }`,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    selectedPathSegment === entry.pathSegment
                      ? selectedBgColor
                      : darken("#FFFFFF", 0.05),
                },
              }}
            >
              {formatEntryLabel(entry.pathSegment)}
            </Button>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 4 }}>
        <Typography
          variant="body1"
          sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: "14px" }}
        >
          2. Use the search bar on the left to add{" "}
          <b>{isGenomicFirstOrOnly ? "Genomic query" : "Filtering terms"}</b> or
          the search bar on the right to add a{" "}
          <b>{isGenomicFirstOrOnly ? "Filtering terms" : "Genomic query"}:</b>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        {isGenomicFirstOrOnly ? (
          <>
            {renderInput("genomic")}
            {renderInput("filter")}
          </>
        ) : (
          <>
            {renderInput("filter")}
            {renderInput("genomic")}
          </>
        )}
      </Box>
    </Box>
  );
}
