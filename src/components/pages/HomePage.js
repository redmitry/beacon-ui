import { useState } from "react";
import { Box } from "@mui/material";
import Founders from "../Founders";
import FiltersContainer from "../filters/FiltersContainer";
import Search from "../Search";
import AllFilteringTermsComponent from "../filters/AllFilteringTermsComponent";
import ResultsContainer from "../results/ResultsContainer";
import config from "../../config/config.json";
import BeaconTypeBanner from "../homepageBanner/BeaconTypeBanner";
import { useSelectedEntry } from "../context/SelectedEntryContext";

export default function HomePage({ selectedTool, setSelectedTool }) {
  const [searchHeight, setSearchHeight] = useState(null);

  const { hasSearchBeenTriggered } = useSelectedEntry();

  const hasGenomicAnnotationsConfig =
    !!config.ui?.genomicAnnotations?.visibleGenomicCategories;

  const hasCommonFiltersConfig =
    !!config.ui?.commonFilters?.filterCategories?.length &&
    !!config.ui?.commonFilters?.filterLabels &&
    Object.keys(config.ui.commonFilters.filterLabels).length > 0;

  const shouldShowFilters =
    hasGenomicAnnotationsConfig || hasCommonFiltersConfig;

  return (
    <>
      {/* Main container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { lg: 4, md: 4, sm: 0 },
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: { xs: 0, md: 1 },
            display: "flex",
            flexDirection: "column",
            width: { lg: "60%", md: "60%" },
            backgroundColor: {
              lg: "lightsalmon",
              md: "pink",
              sm: "lightgreen",
              xs: "lightblue",
            },
          }}
        >
          <Founders />
          <Search
            onHeightChange={setSearchHeight}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />
        </Box>

        {shouldShowFilters && (
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "290px", lg: "338px" },
              flexShrink: 0,
              mt: { xs: "0px", md: "42px" },
              mb: { xs: "25px", lg: "0px" },
              alignSelf: "flex-start",
              height: {
                lg: `${searchHeight}px`,
                md: `${searchHeight}px`,
                sm: "auto",
                xs: "auto",
              },
              p: 0,
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FiltersContainer
              searchHeight={searchHeight}
              hasCommonFiltersConfig={hasCommonFiltersConfig}
              hasGenomicAnnotationsConfig={hasGenomicAnnotationsConfig}
            />
          </Box>
        )}

        {!hasSearchBeenTriggered && selectedTool !== "allFilteringTerms" && (
          <BeaconTypeBanner />
        )}
        {selectedTool === "allFilteringTerms" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: { lg: "-40px", md: "-40px", sm: "20px", xs: "20px" },
              marginBottom: "40px",
            }}
          >
            <AllFilteringTermsComponent />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          marginBottom: "30px",
        }}
      >
        <ResultsContainer />
      </Box>
    </>
  );
}
