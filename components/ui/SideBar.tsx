import Drawer from "@mui/material/Drawer";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import List from "@mui/material/List";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Draft"];

export const SideBar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, i) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {i % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, i) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {i % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
