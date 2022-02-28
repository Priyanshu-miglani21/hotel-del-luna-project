import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomState from "./context/RoomState";
import Booking from "./Components/Booking";
import RoomInfoS from "./context/RoomInfoS";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import ResponsiveAppBar from "./Components/AppBar";
import Rooms from "./Components/Rooms";
import SingleRoom from "./Components/SingleRoom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyBookings from "./Components/MyBookings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <RoomState>
      <RoomInfoS>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="App">
            <BrowserRouter>
              <ThemeProvider theme={darkTheme}>
                <ResponsiveAppBar />
                <Routes>
                  <Route exact path="/" element={<Home />} />

                  <Route exact path="rooms" element={<Rooms />} />

                  <Route
                    exact
                    path="rooms/room/:roomName"
                    element={<SingleRoom />}
                  />

                  {/* <Route exact path="admin" element={<Admin />} /> */}

                  <Route exact path="mybookings" element={<MyBookings />} />

                  <Route exact path="booking" element={<Booking />} />

                  <Route exact path="login" element={<Login />} />

                  <Route exact path="register" element={<Register />} />
                </Routes>
              </ThemeProvider>
            </BrowserRouter>
          </div>
        </LocalizationProvider>
      </RoomInfoS>
    </RoomState>
  );
}

export default App;
