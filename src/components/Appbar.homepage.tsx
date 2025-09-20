"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { signIn, useSession } from "next-auth/react";
import { LoginOutlined } from "@mui/icons-material";

const drawerWidth = 240;
const appBarHeight = 64;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const AppBarHomePage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        height: appBarHeight,
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search Your Favorite Book…" />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Icons */}
        {session ? (
          <>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
              size="large"
              color="inherit"
            >
              <Avatar alt="SH" sizes="medium" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                My Account
              </Typography>
            </IconButton>
          </>
        ) : (
          <Button
            startIcon={<LoginOutlined />}
            sx={{ marginRight: "50px" }}
            variant="outlined"
            onClick={() => signIn()}
            size="large"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHomePage;
