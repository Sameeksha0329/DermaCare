import { React, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/icons/logo.png";
import Person from "../assets/icons/person.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, InputAdornment, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const pages = [
    {
      title: "Home",
      handler: () => {
        navigate("/");
      },
      mustBeLoggedIn: false,
    },
    {
      title: "Checkup",
      handler: () => {
        navigate("/image");
      },
      mustBeLoggedIn: true,
    },
    {
      title: "Contact Us",
      handler: () => {
        navigate("/contact-us");
      },
      mustBeLoggedIn: false,
    },
    {
      title: "Our Team",
      handler: () => {
        navigate("/team");
      },
      mustBeLoggedIn: false,
    },
  ];

  const settings = [
    {
      title: "Profile",
      handler: () => {
        navigate("/profile");
      },
    },
    {
      title: "Logout",
      handler: () => {
        logout();
        navigate("/");
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} className="slide-in-up">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              fontFamily: "Poppins",
              fontWeight: 600,
              color: "#a285bc",
              textDecoration: "none",
            }}
            className="hover-glow"
          >
            <MedicalServicesIcon sx={{ mr: 1, color: "#a285bc" }} />
            <span>DermaCare</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#a285bc" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.mustBeLoggedIn && !isLoggedIn) return null;

                return (
                  <MenuItem
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      page.handler();
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Poppins",
              fontWeight: 600,
              color: "#a285bc",
              textDecoration: "none",
            }}
          >
            <MedicalServicesIcon sx={{ mr: 1, color: "#a285bc" }} />
            <span>DermaCare</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map((page) => {
              if (page.mustBeLoggedIn && !isLoggedIn) return null;

              return (
                <Button
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    page.handler();
                  }}
                  sx={{
                    mx: 1.5,
                    color: "#666666",
                    display: "block",
                    fontWeight: "500",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0",
                      height: "2px",
                      bottom: "0",
                      left: "50%",
                      backgroundColor: "#a285bc",
                      transition: "width 0.3s ease, left 0.3s ease",
                    },
                    "&:hover": {
                      color: "#a285bc",
                      backgroundColor: "transparent",
                      "&::after": {
                        width: "100%",
                        left: "0",
                      },
                    },
                  }}
                  className="hover-scale"
                >
                  {page.title}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery)
                  navigate(`/disease-search?name=${searchQuery}`);
              }}
              style={{ marginRight: "16px" }}
            >
              <TextField
                id="search"
                placeholder="Search diseases..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#a285bc" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "#f5f5f5",
                    '& fieldset': {
                      borderColor: "transparent",
                      borderRadius: "20px",
                    },
                    '&:hover fieldset': {
                      borderColor: "#a285bc",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "#a285bc",
                    },
                  }
                }}
                sx={{
                  width: { xs: "150px", sm: "200px" },
                  transition: "all 0.3s ease",
                  '&:hover': {
                    transform: "translateY(-2px)",
                  }
                }}
                className="slide-in-right"
              />
            </form>

            {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                      alt={username}
                      src={Person}
                    sx={{
                        width: 40, 
                        height: 40,
                        border: "2px solid #a285bc",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        }
                      }}
                      className="pulse"
                    />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.handler();
                    }}
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "30px",
                  padding: "8px 20px",
                }}
                onClick={() => navigate("/")}
                className="hover-lift"
              >
                Login
              </Button>
          )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
