import React, { useState } from "react";
import RoomInfoC from "./RoomInfoC";
const RoomInfoS = (props) => {
  const [roomInfo, setRoomInfo] = useState({});

  const printInfo = () => {
    console.log(roomInfo);
  };

  return (
    <RoomInfoC.Provider value={{ roomInfo, setRoomInfo, printInfo }}>
      {props.children}
    </RoomInfoC.Provider>
  );
};

export default RoomInfoS;
