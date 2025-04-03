import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

export default function Navbar({ title, main }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    "AF Browser",
    "Network Members",
    "About",
    "Contact",
    "Log in",
  ];

  const textStyle = {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "white",
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} className="bg-primary text-white">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src={main}
              alt="Logo"
              className="w-logo-w h-logo-h object-contain"
            />
            <Typography className="font-sans font-normal text-base leading-none tracking-normal">
              {title}
            </Typography>
          </Box>

          <Box>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    ...textStyle, // Spread shared text style
                    textTransform: "none",
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer - now with white text */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { sm: "none" } }}
      >
        <List sx={{ width: 240, pt: 8 }}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <Button
                fullWidth
                sx={{
                  px: 3,
                  py: 1,
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontFamily: '"Open Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: "16px",
                }}
              >
                {item}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
};
