import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import config from "../config/config.json";
import { darken, lighten } from "@mui/system";

export default function Search() {
  const [entryTypes, setEntryTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchEntryTypes = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/entry_types`);
        const data = await res.json();
        const entries = Object.values(data.response.entryTypes || {});
        setEntryTypes(entries);
        console.log(entries);
      } catch (err) {
        console.error("Error fetching entry types:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryTypes();
  }, []);

  const formatEntryLabel = (id) =>
    id === "genomicVariation"
      ? "Genomic Variation"
      : id.charAt(0).toUpperCase() + id.slice(1);

  const primaryColor = config.ui.colors.primary;
  const primaryDarkColor = config.ui.colors.darkPrimary;
  const selectedBgColor = lighten(primaryDarkColor, 0.9);

  return (
    <Box
      sx={{
        minWidth: "1056px",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 11px 0px #9BA0AB24",
        pt: "24px",
        pr: "32px",
        pb: "24px",
        pl: "32px",
      }}
    >
      <Typography
        sx={{
          mb: 2,
          display: "inline-block",
          fontWeight: 700,
        }}
      >
        Search
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="body1">
          1. Choose the <b>result type</b> for your search.
        </Typography>
        <Tooltip
          title={
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                listStyleType: "disc",
                pl: "20px",
                fontFamily: '"Open Sans", sans-serif',
              }}
            >
              <li>Dynamic</li>
            </Box>
          }
          placement="top-start"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "#FFFFFF",
                color: "#000000",
                border: "1px solid black",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                fontFamily: '"Open Sans", sans-serif',
              },
            },
            arrow: {
              sx: {
                color: "#FFFFFF",
                "&::before": {
                  border: "1px solid black",
                },
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              cursor: "pointer",
              display: "inline-block",
              width: "20px",
              height: "20px",
              ml: 3,
              borderRadius: "30px",
              backgroundColor: config.ui.colors.primary,
              color: "white",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: '"Open Sans", sans-serif',
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
              onClick={() => setSelectedType(entry.id)}
              variant="outlined"
              sx={{
                borderRadius: "999px",
                fontWeight: 600,
                textTransform: "none",
                fontFamily: '"Open Sans", sans-serif',
                backgroundColor:
                  selectedType === entry.id ? selectedBgColor : "#FFFFFF",
                color: selectedType === entry.id ? "black" : primaryColor,
                border: `1px solid ${
                  selectedType === entry.id ? "black" : primaryColor
                }`,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    selectedType === entry.id
                      ? selectedBgColor
                      : darken("#FFFFFF", 0.05),
                  boxShadow: "none",
                },
              }}
            >
              {formatEntryLabel(entry.id)}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
