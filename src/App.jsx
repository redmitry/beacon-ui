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
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SelectedEntryProvider } from "./components/context/SelectedEntryContext";
import AllFilteringTermsComponent from "./components/AllFilteringTermsComponent";

export default function App() {
  const [selectedTool, setSelectedTool] = useState(null);

  const baseNavItems = [
    { label: "Network Members", url: "/network-members" },
    ...(config.ui.showAboutPage ? [{ label: "About", url: "/about" }] : []),
    ...(config.ui.showContactPage
      ? [{ label: "Contact", url: "/contact" }]
      : []),
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
    <SelectedEntryProvider>
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
            sx={{
              pt: 10,
              px: { xs: 2, md: 4 },
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                  />
                }
              />
              <Route path="/network-members" element={<NetworkMembers />} />
              {config.ui.showAboutPage && (
                <Route path="/about" element={<About />} />
              )}
              {config.ui.showContactPage && (
                <Route path="/contact" element={<Contact />} />
              )}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>

          <Footer navItems={navItems} />
        </Box>
      </Router>
    </SelectedEntryProvider>
  );
}

function HomePage({ selectedTool, setSelectedTool }) {
  const [searchHeight, setSearchHeight] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        flexWrap: "wrap",
        flexGrow: 1,
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
        <Search
          onHeightChange={setSearchHeight}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "338px" },
          flexShrink: 0,
          position: { md: "sticky" },
          mt: { xs: "0px", md: "30px" },
          mb: { xs: "50px", md: "40px", lg: "0px" },
          alignSelf: "flex-start",
          height: `${searchHeight + 45}px`,
          backgroundColor: "white",
          p: 3,
          borderRadius: "10px",
          boxShadow: "0px 8px 11px 0px #9BA0AB24",
          maxWidth: "338px",
        }}
      >
        <FiltersContainer />
      </Box>
      {selectedTool === "allFilteringTerms" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-40px",
            marginBottom: "40px",
          }}
        >
          <AllFilteringTermsComponent />
        </Box>
      )}
    </Box>
  );
}
