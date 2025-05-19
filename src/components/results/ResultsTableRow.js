import React from 'react';
import {
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  Typography
} from "@mui/material";
import { BEACON_NETWORK_COLUMNS_EXPANDED } from '../../lib/constants';
import MailIcon from "../../assets/logos/mail.png";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';


export default function ResultsTableRow({ item }) {
  return (
    <TableRow>
      <TableCell colSpan={6} sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ p: 0 }}>
          <TableContainer>
            <Table stickyHeader aria-label="Results table">
              <TableBody>
                { item.items.map((dataset, i) => (
                  <React.Fragment key={i}>
                    <TableRow>
                      <TableCell style={{ width: BEACON_NETWORK_COLUMNS_EXPANDED.beacon_dataset }}></TableCell>
                      <TableCell style={{ width: BEACON_NETWORK_COLUMNS_EXPANDED.beacon_dataset_name }}>
                        <Box sx={{ display: 'flex'}}>
                          <Typography sx={{ fontWeight: "bold" }} variant="body2">Dataset: </Typography>
                          <Typography sx={{ paddingLeft: '5px' }} variant="body2">{ dataset.dataset } </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold"  }}  style={{ width: BEACON_NETWORK_COLUMNS_EXPANDED.beacon_dataset_response }}>
                        { dataset.results.length > 0 ? dataset.results.length : '-' }
                      </TableCell>
                      <TableCell style={{ width: BEACON_NETWORK_COLUMNS_EXPANDED.beacon_dataset_detail }}><CalendarViewMonthIcon /></TableCell>
                      <TableCell style={{ width: BEACON_NETWORK_COLUMNS_EXPANDED.beacon_dataset_contact }}>
                        <img
                          src={MailIcon}
                          alt="Contact"
                          style={{
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TableCell>
    </TableRow>
  );
}