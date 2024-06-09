import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard"); // Navigate to the home page when Dashboard is clicked
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            component={Link}
            to="/customer-bookings"
            onClick={handleMenuClose}
          >
            All Bookings
          </MenuItem>
          {/* Add more menu items as needed */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Typography
          onClick={handleDashboardClick}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        {user && (
          <Button color="inherit" onClick={handleDashboardClick}>
            {" "}
            {/* Change the to prop to onClick */}
            {user.username}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
