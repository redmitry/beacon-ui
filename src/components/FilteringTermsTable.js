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
import { useState } from "react";
import { alpha, lighten } from "@mui/material/styles";
import config from "../config/config.json";

export default function FilteringTermsTable({ filteringTerms }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const bgPrimary = lighten(config.ui.colors.primary, 0.8);
  const primary = config.ui.colors.primary;

  const headerCellStyle = {
    backgroundColor: bgPrimary,
    // backgroundColor: primary,
    fontWeight: 700,
  };

  const allFilteringTerms = filteringTerms?.response?.filteringTerms ?? [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  <TableCell>{term.scopes?.join(", ") || ""}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
