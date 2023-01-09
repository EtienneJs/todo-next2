import { Box } from "@mui/material";
import { FunctionComponent, FC } from "react";
import Head from "next/head";
import { Navbar, SideBar } from "../ui";
interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <SideBar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
