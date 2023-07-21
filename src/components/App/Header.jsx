import { useHistory } from "react-router-dom";
import { useState } from "react";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

const Header = () => {
  const history = useHistory();
  const [isMenu, setIsMenu] = useState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setIsMenu(!isMenu);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movies Sagas
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={() => {
              history.push("/");
            }}
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isMenu && (
        <Paper
          sx={{ width: 320, maxWidth: "100%", position: "absolute", zIndex: 1 }}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                history.push("/add-movie");
                setIsMenu(false);
              }}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Movie</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                history.push("/");
                setIsMenu(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Movie List</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      )}
    </Box>
  );
};

export default Header;
