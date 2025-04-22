import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { alpha, lighten } from "@mui/material/styles";
import config from "../config/config.json";

export default function FilteringTermsTable({ filteringTerms, defaultScope }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedScopes, setSelectedScopes] = useState({});

  useEffect(() => {
    if (!filteringTerms?.response?.filteringTerms || !defaultScope) return;

    const terms = filteringTerms.response.filteringTerms;
    const scopeAlias = {
      individuals: "individual",
      biosamples: "biosample",
      analyses: "analysis",
      cohorts: "cohort",
      datasets: "dataset",
      g_variants: "genomic",
    };

    const normalized = scopeAlias[defaultScope] || defaultScope;
    const defaults = {};

    terms.forEach((term) => {
      const match = term.scopes?.find(
        (scope) => scope.toLowerCase() === normalized.toLowerCase()
      );

      if (match) {
        defaults[term.id] = match;
      } else if (term.scopes?.length > 0) {
        defaults[term.id] = term.scopes[0];
      }
    });

    setSelectedScopes(defaults);
  }, [filteringTerms, defaultScope]);
  console.log(defaultScope);

  const bgPrimary = lighten(config.ui.colors.primary, 0.8);
  const primary = config.ui.colors.primary;

  const headerCellStyle = {
    backgroundColor: bgPrimary,
    // backgroundColor: primary,
    fontWeight: 700,
  };

  const capitalize = (word) =>
    word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();

  const allFilteringTerms = filteringTerms?.response?.filteringTerms ?? [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleScopeClick = (termId, scope) => {
    setSelectedScopes((prev) => ({
      ...prev,
      [termId]: scope,
    }));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="filtering terms table">
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>ID</TableCell>
              <TableCell sx={headerCellStyle}>Label</TableCell>
              <TableCell sx={headerCellStyle}>Scope</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFilteringTerms
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((term, index) => (
                <TableRow key={index}>
                  <TableCell>{term.id}</TableCell>
                  <TableCell>{term.label || ""}</TableCell>
                  <TableCell>
                    {term.scopes?.map((scope, i) => {
                      const isSelected = selectedScopes[term.id] === scope;
                      return (
                        <Box
                          key={i}
                          component="span"
                          onClick={() => handleScopeClick(term.id, scope)}
                          sx={{
                            display: "inline-block",
                            backgroundColor: isSelected
                              ? config.ui.colors.primary
                              : "#fff",
                            color: isSelected
                              ? "#fff"
                              : config.ui.colors.darkPrimary,
                            border: `1px solid ${
                              isSelected
                                ? config.ui.colors.primary
                                : config.ui.colors.darkPrimary
                            }`,
                            borderRadius: "7px",
                            fontSize: "12px",
                            px: 1.5,
                            py: 0.3,
                            mr: 1,
                            mb: 0.5,
                            fontFamily: '"Open Sans", sans-serif',
                            textTransform: "capitalize",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          {capitalize(scope)}
                        </Box>
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={allFilteringTerms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
