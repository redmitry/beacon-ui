import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import config from "../../config/config.json";
import FilterLabel from "../styling/FilterLabel";
import { useSelectedEntry } from "./../context/SelectedEntryContext";

export default function GenomicAnnotations() {
  const allGenomicCategories = [
    "SNP Examples",
    "CNV Examples",
    "Protein Examples",
    "Molecular Effect",
  ];

  const {
    setSelectedFilter,
    setExtraFilter,
    setLoadingData,
    setResultData,
    setHasSearchResult,
  } = useSelectedEntry();

  const genomicVisibleCategories =
    config.ui.genomicAnnotations?.visibleGenomicCategories || [];

  const filterCategories = allGenomicCategories.filter((cat) =>
    genomicVisibleCategories.includes(cat)
  );

  const filterLabels = {
    "SNP Examples": [
      {
        id: "TP53",
        label: "TP53"
      }, {
        id: "7661960T>C",
        label: "7661960T>C",
      }, {
        id: "NC_000023.10 : 33038255C>A",
        label: "NC_000023.10 : 33038255C>A"
      }],
    "CNV Examples": [{
        id: "NC_000001.11 : 1234del",
        label:  "NC_000001.11 : 1234del"
      }, {
        id:  "MSK1 : 7572837_7578461del",
        label:  "MSK1 : 7572837_7578461del",
      }, {
        id: "NC_000001.11 : [5000, 7676]",
        label: "NC_000001.11 : [5000, 7676]"
      }, {
        id: "[7669, 10000]del",
        label: "[7669, 10000]del"
      }
    ],
    "Protein Examples": [{
        id: "TP53 : p.Trp285Cys",
        label: "TP53 : p.Trp285Cys"
      }, {
        id: "NP_003997.1:p.Trp24Cys",
        label: "NP_003997.1:p.Trp24Cys"
      }
    ],
    "Molecular Effect": [{
        id: "Missense Variant",
        label: "Missense Variant"
      }, {
        id: "Frameshift Variant",
        label: "Frameshift Variant"
      }, {
        id: "Stop gained",
        label: "Stop gained"
      }, {
        id: "Gain of function",
        label: "Gain of function"
      }, {
        id: "Loss of function",
        label: "Loss of function"
      }, {
        id: "Null mutation",
        label: "Null mutation"
      }
    ],
  };

  const [expanded, setExpanded] = useState(() => {
    const initialState = {};
    let firstSet = false;

    allGenomicCategories.forEach((topic) => {
      const validLabels = filterLabels[topic]?.filter(
        (label) => label.label.trim() !== ""
      ) || [];

      if (validLabels.length > 0 && !firstSet) {
        initialState[topic] = true;
        firstSet = true;
      } else {
        initialState[topic] = false;
      }
    });
    return initialState;
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded({ [panel]: isExpanded });
  };

  const summarySx = {
    px: 0,
    "& .MuiAccordionSummary-expandIconWrapper": {
      marginLeft: "auto",
      transition: "transform 0.2s ease-in-out",
    },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      mr: 1,
    },
  };

  const handleGenomicFilterChange = (item) => {
    setLoadingData(false);
    setResultData([]);
    setHasSearchResult(false);
    if (item.type === "alphanumeric") {
      setExtraFilter(item);
    } else {
      setSelectedFilter((prevFilters) => {
        const isDuplicate = prevFilters.some(
          (filter) => filter.key === item.key
        );
        if (isDuplicate) {
          setMessage(
            "This filter is already in use. Choose another one to continue."
          );
          setTimeout(() => setMessage(null), 5000);
          return prevFilters;
        }

        return [...prevFilters, item];
      });
    }
  };
  
  return (
    <Box>
      {filterCategories.map((topic) => {
        const validLabels = filterLabels[topic]?.filter(
          (label) => label.label.trim() !== ""
        );

        if (!validLabels || validLabels.length === 0) return null;

        return (
          <Accordion
            key={topic}
            expanded={!!expanded[topic]}
            onChange={handleChange(topic)}
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
                {topic}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {validLabels.map((item) => (
                  <FilterLabel
                    key={item.label}
                    label={item.label}
                    onClick={() => handleGenomicFilterChange(item)}
                    bgColor="genomic"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
