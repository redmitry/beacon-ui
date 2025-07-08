export function capitalize(word) {
  return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
}

export const PATH_SEGMENT_TO_ENTRY_ID = {
  individuals: "individual",
  biosamples: "biosample",
  cohorts: "cohort",
  datasets: "dataset",
  g_variants: "genomicVariant",
  analysis: "analysis",
  runs: "run",
};
