import Navbar from "./components/Navbar";
import { CssBaseline, Box } from "@mui/material";
import config from "./config/config.json";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Navbar title={config.ui.title} main={config.ui.logos.main} />
      <Box component="main" sx={{ pt: 8 }}>
        {" "}
      </Box>
    </>
  );
}
