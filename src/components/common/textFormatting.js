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

export const AMINO_ACIDS = [
  "Ala",
  "Cys",
  "Asp",
  "Glu",
  "Phe",
  "Gly",
  "His",
  "Ile",
  "Lys",
  "Leu",
  "Met",
  "Asn",
  "Pro",
  "Gln",
  "Arg",
  "Ser",
  "Thr",
  "Val",
  "Trp",
  "Tyr",
];
