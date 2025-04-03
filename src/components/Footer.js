import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import maingrey from "../maingrey.svg";
import crg from "../crg.svg";

export default function Footer({ navItems }) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#eee",
        py: 2,
        px: 4,
        mt: 4,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body2" color="black">
            Beacon User Interface template provided by:
          </Typography>

          <img src={maingrey} alt="EGA Logo" style={{ height: 34 }} />
          <img src={crg} alt="CRG Logo" style={{ height: 34 }} />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => (
            <MuiLink
              key={item}
              href="#"
              underline="none"
              sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: "14px",
                color: "#333",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item}
            </MuiLink>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
