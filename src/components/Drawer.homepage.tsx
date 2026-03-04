"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";

import BusinessSharpIcon from "@mui/icons-material/BusinessSharp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
};

const drawerWidth = 280;

const DrawerHomePage = () => {
  const pathname = usePathname();

  const mainMenu: MenuItem[] = [
    { text: "Discover", icon: <HomeOutlinedIcon />, path: "/" },
    { text: "My Library", icon: <BookOutlinedIcon />, path: "/booklibrary" },
    {
      text: "Recommendations",
      icon: <ImportContactsOutlinedIcon />,
      path: "/recommended",
    },
    {
      text: "Favorites",
      icon: <FavoriteBorderOutlinedIcon />,
      path: "#",
    },
    {
      text: "Download",
      icon: <SimCardDownloadOutlinedIcon />,
      path: "#",
    },
  ];

  const secondaryMenu: MenuItem[] = [
    { text: "Setting", icon: <SettingsRoundedIcon />, path: "#" },
    { text: "Support", icon: <SupportAgentRoundedIcon />, path: "#" },
    { text: "Logout", icon: <LogoutSharpIcon />, onClick: () => signOut() },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.path && pathname === item.path;

    return (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          component={item.path ? Link : "button"}
          href={item.path}
          onClick={item.onClick}
          sx={{
            backgroundColor: isActive ? "#b7bcf8ff" : "transparent",
            "&:hover": {
              backgroundColor: "#d3d6fc",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <BusinessSharpIcon fontSize="large" color="primary" />
          <Typography fontSize="24px" fontWeight={600}>
            BookBase
          </Typography>
        </Link>
      </Box>

      {/* Main Menu */}
      <Box sx={{ flexGrow: 1 }}>
        <List>{mainMenu.map(renderMenuItem)}</List>
        <Divider />
        <List>{secondaryMenu.map(renderMenuItem)}</List>
      </Box>
    </Drawer>
  );
};

export default DrawerHomePage;
