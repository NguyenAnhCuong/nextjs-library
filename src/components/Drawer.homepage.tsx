"use client";

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
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";

const DrawerHomePage = (props: any) => {
  const pathname = usePathname();

  const itemList = [
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
      path: "/favorites",
    },
    {
      text: "Download",
      icon: <SimCardDownloadOutlinedIcon />,
      path: "/download",
    },
  ];

  const itemList2 = [
    { text: "Setting", icon: <SettingsRoundedIcon />, path: "/settings" },
    { text: "Support", icon: <SupportAgentRoundedIcon />, path: "/support" },
    {
      text: "Logout",
      icon: <LogoutSharpIcon />,
      onClick: () => signOut(),
    },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: "20vw", // set width ở đây
          "& .MuiDrawer-paper": {
            width: "20vw", // set width ở đây
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            height: "100px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href={"/"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <BusinessSharpIcon fontSize="large" color="primary" />
            <Typography fontSize="24px" sx={{ ml: "5px" }}>
              BookBase
            </Typography>
          </Link>
        </Box>
        <Box role="presentation" sx={{ width: "100%" }}>
          <List>
            {itemList.map((item: any, index: number) => (
              <Link href={item.path} key={`${item.text}-${index}`}>
                <ListItem
                  sx={
                    pathname === item.path
                      ? { backgroundColor: "#b7bcf8ff" }
                      : {}
                  }
                  key={item.text}
                  disablePadding
                >
                  <ListItemButton onClick={item.onClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {itemList2.map((item: any, index: number) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerHomePage;
