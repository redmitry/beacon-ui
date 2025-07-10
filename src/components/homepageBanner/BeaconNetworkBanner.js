import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import config from "../../config/config.json";

export default function BeaconNetworkBanner() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/`);
        const data = await res.json();

        const entries = data.responses || [];

        const seen = new Set();
        const cleaned = entries
          .map((entry) => {
            const logoUrl = entry?.response?.organization?.logoUrl;
            const beaconId = entry?.response?.id;
            return logoUrl ? { logoUrl, beaconId } : null;
          })
          .filter(Boolean)
          .filter((entry) => {
            if (seen.has(entry.logoUrl)) return false;
            seen.add(entry.logoUrl);
            return true;
          });

        setLogos(cleaned);
      } catch (err) {
        console.error("Error loading beacon network logos:", err);
      }
    };

    fetchLogos();
  }, []);

  const handleLogoError = (logoUrlToRemove) => {
    setLogos((prev) => prev.filter((l) => l.logoUrl !== logoUrlToRemove));
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          my: 3,
          mx: 4,
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        Beacon Network Members
      </Typography>

      <Box sx={{ m: 4 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {logos.map((entry) => (
            <Grid key={entry.beaconId}>
              <Box
                component="img"
                src={entry.logoUrl}
                alt={entry.beaconId}
                onError={() => handleLogoError(entry.logoUrl)}
                sx={{
                  width: { sm: "150px", xs: "110px" },
                  height: "50px",
                  objectFit: "contain",
                  padding: "4px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
