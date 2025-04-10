import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Founders from "./components/Founders";
import FiltersContainer from "./components/FiltersContainer";
import Search from "./components/Search";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import NetworkMembers from "./components/pages/NetworkMembers";
import Login from "./components/pages/Login";
import { CssBaseline, Box } from "@mui/material";
import config from "./config/config.json";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  const baseNavItems = [
    { label: "Network Members", url: "/network-members" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Log in", url: "/login" },
  ];

  const filteredBaseItems =
    config.beaconType !== "networkBeacon"
      ? baseNavItems.filter((item) => item.label !== "Network Members")
      : baseNavItems;

  const cleanedExternalLinks = (config.ui.externalNavBarLink || []).filter(
    (link) => link.label && link.label.trim() !== ""
  );

  const navItems = [...cleanedExternalLinks, ...filteredBaseItems];

  return (
    <Router>
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
          sx={{ pt: 10, px: { xs: 2, md: 4 }, flexGrow: 1 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/network-members" element={<NetworkMembers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>

        <Footer navItems={navItems} />
      </Box>
    </Router>
  );
}

function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          flexGrow: { xs: 0, md: 1 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Founders />
        <Search />
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
  );
}
