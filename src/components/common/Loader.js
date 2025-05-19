import { Box, Typography } from "@mui/material";
import config from "../../config/config.json";

export default function Loader({ message }) {
  const loaderColor = config.ui.colors.primary;

  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <Box className="loader-message">
          <Typography
              translate="no"
              sx={{ fontStyle: "italic", fontSize: "17px" }}
            >
            { message }
          </Typography>
        </Box>
        <Box
          sx={{
            pt: "50px",
            minHeight:"40px"
          }}>
          <div 
            className="loader"
            style={{ color: loaderColor }}>
          </div>
        </Box>
      </div>
    </div>
  )
}