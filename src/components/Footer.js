import { Box, Typography, Link as MuiLink } from "@mui/material";
import maingrey from "../assets/logos/maingrey.svg";
import crg from "../assets/logos/crg.svg";

export default function Footer({ navItems }) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#eee",
        py: 2,
        px: 4,

        minHeight: "68px",
        mt: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mx: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Typography variant="body2" color="black">
            Beacon User Interface template provided by:
          </Typography>

          <img src={maingrey} alt="EGA Logo" style={{ height: 34 }} />
          <img src={crg} alt="CRG Logo" style={{ height: 34 }} />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => (
            <MuiLink
              key={item.label}
              href={item.url || "#"}
              target={item.url ? "_blank" : "_self"}
              rel={item.url ? "noopener noreferrer" : undefined}
              underline="none"
              sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: "14px",
                color: "#333",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item.label}
            </MuiLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
