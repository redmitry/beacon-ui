// import { Popover, Typography, Button, Box } from "@mui/material";
// import { capitalize } from "../common/textFormatting";

// export default function ScopeSelector({
//   anchorEl,
//   onClose,
//   scopes = [],
//   selectedScope,
//   onScopeChange,
// }) {
//   const open = Boolean(anchorEl);

//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "center",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "center",
//       }}
//       PaperProps={{
//         sx: {
//           boxShadow: "none",
//           border: "1px solid #002E4E", // optional darker border
//           borderRadius: "18px",
//           backgroundColor: "#e0f0ff", // light bluish background
//           padding: 2,
//         },
//       }}
//     >
//       <Box p={2} minWidth={200}>
//         <Typography fontWeight={400} fontSize={14} mb={1}>
//           Select the scope:
//         </Typography>
//         <Box display="flex" gap={1} flexWrap="wrap">
//           {scopes.map((scope) => (
//             <Button
//               key={scope}
//               variant={scope === selectedScope ? "contained" : "outlined"}
//               onClick={() => {
//                 onScopeChange(scope);
//                 onClose();
//               }}
//               sx={{
//                 borderRadius: "10px",
//                 fontWeight: 500,
//                 textTransform: "none",
//               }}
//             >
//               {capitalize(scope)}
//             </Button>
//           ))}
//         </Box>
//       </Box>
//     </Popover>
//   );
// }
