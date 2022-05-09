import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Divider,
  List,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { searchData } from "../data/searchData";
import MenuDrawer from "./MenuDrawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Home from "../screen/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import RFWIki from "../screen/RFWIki";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function TopBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleMainLinks = (index) => {
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/rf");
        break;
      default:
        navigate("/");
        break;
    }
  };
  const handleSubLinks = (index) => {
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/rf");
        break;
      default:
        navigate("/");
        break;
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        component="nav"
        sx={{ background: "orange" }}
      >
        <Toolbar variant="dense">
          <Grid
            container
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item lg={10}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={searchData}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for questions..."
                    size="small"
                    fullWidth
                    color="secondary"
                  />
                )}
              />
            </Grid>
            <Grid item lg={1}>
              <Typography
                variant="h1"
                sx={{ fontSize: "1.5rem", color: "black" }}
                align="right"
              >
                Pohx Wiki
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "RF WIki", "Builds", "Coming Soon"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleMainLinks(index)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {["Path of Building", "Loot FIlter", "Misc", "About Creator"].map(
            (text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleSubLinks(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/rf" element={<RFWIki />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}
