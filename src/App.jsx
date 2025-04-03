import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
    <>
      <CssBaseline />
      <Navbar
        title={config.ui.title}
        main={config.ui.logos.main}
        navItems={navItems}
      />
      <Box component="main" sx={{ pt: 8 }}></Box>
      <Footer navItems={navItems} />
    </>
  );
}
