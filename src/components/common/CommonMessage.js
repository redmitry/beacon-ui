import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const COMMON_MESSAGES = {
  noMatch: "No match found. Try another filter.",
  loadingTerms: "Loading filtering terms...",
  filteringResults: "Filtering results...",
  doubleFilter:
    "This filter is already in use. Choose another one to continue.",
  loadingData: "Loading data...",
};

export default function CommonMessage({ text, type }) {
  const severity = type === "error" ? "error" : "success";

  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Alert
        severity={severity}
        sx={{ width: "80%", justifyContent: "center", alignItems: "center" }}
      >
        {text}
      </Alert>
    </Stack>
  );
}
