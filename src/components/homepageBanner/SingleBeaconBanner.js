import { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Link } from "@mui/material";
import config from "../../config/config.json";
import { useSelectedEntry } from "../context/SelectedEntryContext";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`beacon-tabpanel-${index}`}
      aria-labelledby={`beacon-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </div>
  );
}

// TODO: Add Loader!
export default function SingleBeaconBanner() {
  const [tabValue, setTabValue] = useState(0);
  const [beaconInfo, setBeaconInfo] = useState();
  const { entryTypes } = useSelectedEntry();

  useEffect(() => {
    const fetchBeaconInfo = async () => {
      try {
        const res = await fetch(`${config.apiUrl}`);
        const data = await res.json();
        setBeaconInfo(data.response);
      } catch (error) {
        console.error("Failed to fetch beacon info:", error);
      }
    };
    fetchBeaconInfo();
  }, []);

  console.log("beaconInfo", beaconInfo);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Tabs Header */}
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Beacon Info Tabs"
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: "0px",
          px: 2,
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab
          label="Beacon Information"
          sx={{
            textTransform: "none",
            fontSize: "13px",
            fontWeight: tabValue === 0 ? "bold" : "normal",
            color: tabValue === 0 ? "#000" : "#9E9E9E",
            backgroundColor: tabValue === 0 ? "#fff" : "transparent",
            borderRadius: "8px 8px 0 0",
            px: 2,
            "&:hover": {
              backgroundColor: tabValue === 0 ? "#fff" : "#e0e0e0",
            },
            "&.Mui-selected": {
              color: "#000",
            },
          }}
        />
        <Tab
          label="Datasets Information"
          sx={{
            textTransform: "none",
            fontSize: "13px",
            fontWeight: tabValue === 1 ? "bold" : "normal",
            color: tabValue === 1 ? "#000" : "#9E9E9E",
            backgroundColor: tabValue === 1 ? "#fff" : "transparent",
            borderRadius: "8px 8px 0 0",
            px: 2,
            "&:hover": {
              backgroundColor: tabValue === 1 ? "#fff" : "#e0e0e0",
            },
            "&.Mui-selected": {
              color: "#000",
            },
          }}
        />
      </Tabs>

      {/* Content Box */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Panel 1 – Beacon Info */}
        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Beacon Information
          </Typography>
          {beaconInfo && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "14px",
                  flex: "1 1 60%",
                  minWidth: "250px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    flex: "1 1 60%",
                    minWidth: "250px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: "14px",
                    }}
                  >
                    <strong>Organization:</strong>{" "}
                    {beaconInfo.organization?.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: "14px",
                      color: "#000",
                    }}
                  >
                    <strong>Organization URL:</strong>{" "}
                    <Link
                      href={beaconInfo.organization?.contactUrl}
                      target="_blank"
                      rel="noopener"
                      sx={{ color: "#3176B1" }}
                    >
                      {beaconInfo.organization?.contactUrl?.replace(
                        "mailto:",
                        ""
                      )}
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: "14px",
                      color: "#000",
                    }}
                  >
                    <strong>Beacon URL:</strong>{" "}
                    <Link
                      href={beaconInfo.welcomeUrl}
                      target="_blank"
                      rel="noopener"
                      sx={{ color: "#3176B1" }}
                    >
                      {beaconInfo.welcomeUrl}
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: "14px",
                      color: "#000",
                    }}
                  >
                    <strong>Types of information:</strong>{" "}
                    {entryTypes?.length > 0
                      ? entryTypes
                          .map((entry) =>
                            entry.pathSegment === "g_variants"
                              ? "Genomic Variants"
                              : entry.pathSegment.charAt(0).toUpperCase() +
                                entry.pathSegment.slice(1)
                          )
                          .join(", ")
                      : "Not available"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flex: "1 1 35%",
                    justifyContent: "flex-start",
                    minWidth: "150px",
                  }}
                >
                  {beaconInfo.organization?.logoUrl && (
                    <Box
                      component="img"
                      src={beaconInfo.organization.logoUrl}
                      alt="Organization Logo"
                      sx={{
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </>
          )}
        </TabPanel>

        {/* Panel 2 – Datasets Info */}
        <TabPanel value={tabValue} index={1}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Datasets Information
          </Typography>
          <Typography variant="body2">TODO</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}
