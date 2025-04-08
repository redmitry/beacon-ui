import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Founders from "./components/Founders";
import FiltersContainer from "./components/FiltersContainer";
import { CssBaseline, Box } from "@mui/material";
import config from "./config/config.json";

export default function App() {
  const navItems = [
    "AF Browser",
    "Network Members",
    "About",
    "Contact",
    "Log in",
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Navbar
        title={config.ui.title}
        main={config.ui.logos.main}
        navItems={navItems}
      />

      <Box
        component="main"
        sx={{
          pt: 8,
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          px: { xs: 2, md: 4 },
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            flexGrow: { xs: 0, md: 1 },
            height: { xs: "50px", sm: "70px", md: "90px" },
          }}
        >
          <Founders />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "338px" },
            flexShrink: 0,
            position: { md: "sticky" },
            mt: { xs: "auto", md: "30px" },
            mb: "50px",
            alignSelf: "flex-start",
            height: "fit-content",
          }}
        >
          <FiltersContainer />
        </Box>
      </Box>

      <Footer navItems={navItems} />
    </Box>
  );
}
