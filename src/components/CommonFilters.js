// import { Chip, Box } from "@mui/material";

// export default function CommonFilters() {
//   const filters = [
//     "Female",
//     "Male",
//     "Age",
//     "Weight",
//     "Height",
//     "Cancer",
//     "COVID",
//   ];

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//       {filters.map((filter) => (
//         <Chip
//           key={filter}
//           label={filter}
//           onClick={() => console.log(filter)}
//           sx={{ borderRadius: 1 }}
//         />
//       ))}
//     </Box>
//   );
// }

import {
  Box,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

export default function CommonFilters() {
  const [expanded, setExpanded] = useState({
    demographics: true,
    cancer: false,
    covid: false,
  });

  const demographicFilters = [
    "Female",
    "Male",
    "Age Of Onset",
    "Weight",
    "Height",
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded });
  };

  const summarySx = {
    px: 0,
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      ml: 1,
    },
  };

  return (
    <Box>
      <Accordion
        expanded={expanded.demographics}
        onChange={handleChange("demographics")}
        disableGutters
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon />}
          sx={summarySx}
        >
          <Typography
            translate="no"
            sx={{ fontStyle: "italic", fontSize: "14px" }}
          >
            Demographics
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {demographicFilters.map((filter) => (
              <Chip
                translate="no"
                key={filter}
                label={filter}
                onClick={() => console.log(filter)}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded.cancer}
        onChange={handleChange("cancer")}
        disableGutters
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon />}
          sx={summarySx}
        >
          <Typography
            translate="no"
            sx={{ fontStyle: "italic", fontSize: "14px" }}
          >
            Cancer
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded.covid}
        onChange={handleChange("covid")}
        disableGutters
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon />}
          sx={summarySx}
        >
          <Typography
            translate="no"
            sx={{ fontStyle: "italic", fontSize: "14px" }}
          >
            Covid
          </Typography>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
}
