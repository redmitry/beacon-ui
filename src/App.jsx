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
          px: 2,
        }}
      >
        <Founders />
        <FiltersContainer />
      </Box>

      <Footer navItems={navItems} />
    </Box>
  );
}
