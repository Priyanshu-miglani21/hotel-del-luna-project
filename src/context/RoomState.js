import React, { useState } from "react";
import data from "../data";
import roomContext from "./roomContext";

const getMyBookings = async () => {
  const response = await fetch(
    "https://hotel-del-luna-miglani.herokuapp.com/rooms/getMyBookings",
    {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    }
  );

  const data = await response.json();
  return data;
};

const getUserInfo = async () => {
  const response = await fetch(
    "https://hotel-del-luna-miglani.herokuapp.com/rooms/getUserInfo",
    {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    }
  );
  const data = await response.json();
  return data;
};

const RoomState = (props) => {
  const [rooms, setRooms] = useState(data);
  const [guests, setguests] = useState({});

  const getRoom = (param) => {
    const room = rooms.filter((room) => room.name === param)[0];

    return room;
  };

  return (
    <roomContext.Provider
      value={{
        rooms,
        getRoom,
        setguests,
        guests,
        getMyBookings,
        getUserInfo,
      }}
    >
      {props.children}
    </roomContext.Provider>
  );
};

export default RoomState;
