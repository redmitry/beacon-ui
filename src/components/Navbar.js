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
import config from "../config/config.json";

export default function Navbar({ title, main, navItems }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: config.ui.colors.primary,
          color: "white",
          px: 4,
          minHeight: "68x",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src={main}
              alt="Logo"
              className="w-logo-w h-logo-h object-contain"
            />
            <Typography
              className="font-sans"
              sx={{
                fontWeight: "bold",
                fontFamily: '"Open Sans", sans-serif',
              }}
            >
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
              {navItems
                .filter((item) => item.label && item.label.trim() !== "")
                .map((item) => (
                  <Button
                    key={item.label}
                    href={item.url || "#"}
                    target={item.url ? "_blank" : "_self"}
                    rel={item.url ? "noopener noreferrer" : undefined}
                    sx={{
                      ...textStyle,
                      textTransform: "none",
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { sm: "none" } }}
      >
        <List sx={{ width: 240, pt: 3 }}>
          <ListItem
            sx={{
              px: 3,
              py: 1,
              justifyContent: "flex-start",
              textTransform: "none",
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 700,
              fontSize: "16px",
              color: config.ui.colors.primary,
            }}
          >
            {title}
          </ListItem>
          {navItems
            .filter((item) => item.label && item.label.trim() !== "")
            .map((item) => (
              <ListItem key={item.label} disablePadding>
                <Button
                  fullWidth
                  href={item.url || "#"}
                  target={item.url ? "_blank" : "_self"}
                  rel={item.url ? "noopener noreferrer" : undefined}
                  sx={{
                    px: 3,
                    py: 1,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: "16px",
                    color: config.ui.colors.primary,
                  }}
                >
                  {item.label}
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
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};
