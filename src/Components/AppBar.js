import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../logos/logo_big.png";
import { Link } from "react-router-dom";
import RoomContext from "../context/roomContext";
import Dashboard from "./Dashboard";
const ResponsiveAppBar = () => {
  const { getUserInfo } = useContext(RoomContext);

  const location = useLocation();
  const [token, setToken] = useState("");
  const [user, setUser] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [draw, setDraw] = useState(false);
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

  const toggleDrawer = (open) => (event) => {
    handleCloseUserMenu();
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDraw(open);
  };

  const logOut = () => {
    handleCloseUserMenu();
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  const getInfo = async () => {
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/auth/getUser",
      {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      setUser(data.userInfo);
      //   console.log(data.userInfo);
    } else {
      console.log(data.error);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getInfo();
    }
    // getMyInfo();
    return () => {
      setUser(false); // This worked for me
      setToken("");
      setDraw(false);
    };
  }, []);

  return (
    <AppBar position="absolute" className="bg-white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={logo} alt="HOTEL DEL LUNA" id="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className="text-black" />
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  className={
                    location.pathname === "/"
                      ? "nav-link text-xl text-white"
                      : "nav-link text-xl text-gray-900 hover:text-gray-800"
                  }
                  to="/"
                >
                  Home
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  className={
                    location.pathname.includes("/rooms")
                      ? "nav-link text-xl text-white"
                      : "nav-link text-xl text-gray-900 hover:text-gray-800"
                  }
                  to="/rooms"
                >
                  Rooms
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  className={
                    location.pathname === "/mybookings"
                      ? "nav-link text-xl text-white"
                      : "nav-link text-xl text-gray-900 hover:text-gray-800"
                  }
                  to="/mybookings"
                >
                  My Bookings
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img src={logo} alt="HOTEL DEL LUNA" id="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ul className="flex">
              <li className="nav-item ">
                <Link
                  className={
                    location.pathname === "/"
                      ? "nav-link text-xl text-black"
                      : "nav-link text-xl text-gray-500 hover:text-gray-900"
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item ml-[-10px]">
                <Link
                  className={
                    location.pathname.includes("/rooms")
                      ? "nav-link text-xl text-black"
                      : "nav-link text-xl text-gray-500 hover:text-gray-900"
                  }
                  to="/rooms"
                >
                  Rooms
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  className={
                    location.pathname === "/mybookings"
                      ? "nav-link text-xl text-black"
                      : "nav-link text-xl text-gray-500 hover:text-gray-900"
                  }
                  to="/mybookings"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <>
                <Tooltip title={"Open Settings"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user.name ? (
                      <Dashboard name={user.name} />
                    ) : (
                      <Skeleton
                        variant="circular"
                        className="bg-black"
                        width={40}
                        height={40}
                      />
                    )}
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
                  <Drawer
                    anchor={"left"}
                    open={draw}
                    onClose={toggleDrawer(false)}
                  >
                    <div id="drawer">
                      <div className="py-2 px-1">
                        {user ? (
                          <div className="m-4 flex flex-col justify-evenly">
                            <Dashboard name={user.name} />
                            <div className="flex flex-col mt-4">
                              <h1 className="text-sm sm:text-xl text-green-700">
                                Username😎
                              </h1>
                              <h1 className="text-sm sm:text-xl text-white mt-2">
                                {user.name[0].toUpperCase() +
                                  user.name.slice(1)}
                              </h1>
                            </div>
                            <div className="flex flex-col mt-4">
                              <h1 className="text-sm sm:text-xl text-green-700">
                                Email📧
                              </h1>
                              <h1 className="text-sm sm:text-xl text-white mt-2">
                                {user.email}
                              </h1>
                            </div>
                            <div className="flex flex-col mt-4">
                              <h1 className="text-xl sm:text-2xl font-extrabold text-red-400 w-48">
                                😊Welcome{" "}
                                {user.name[0].toUpperCase() +
                                  user.name.slice(1)}
                                , to Hotel Del Luna
                              </h1>
                            </div>
                            <div className="flex flex-col mt-4">
                              <img
                                src="https://c.tenor.com/OrWIV_jmwE0AAAAd/heart-i-love-you.gif"
                                alt="ΣPRIYANSHU!"
                                className="w-40 xl:w-52 rounded-full"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="m-4 w-[20vw]">
                            <Skeleton
                              variant="circular"
                              width={40}
                              height={40}
                              className="m-2"
                            />
                            <Skeleton animation="wave" className="my-1" />
                            <Skeleton animation="wave" className="my-1" />
                            <Skeleton animation="wave" className="my-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Drawer>
                  <MenuItem onClick={toggleDrawer(true)}>
                    <h1 className="text-lg">Dashboard</h1>
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <h1 className="text-lg">Logout</h1>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className="flex">
                <Link
                  id="link1"
                  className={
                    location.pathname === "/register"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/register"
                >
                  SignUp
                </Link>

                <Link
                  id="link2"
                  className={
                    location.pathname === "/login"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
