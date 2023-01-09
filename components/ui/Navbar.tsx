import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href={"/"} passHref legacyBehavior>
          <Link href="/" color="white" underline="none">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
