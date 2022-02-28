import React, { useState, useEffect, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RoomContext from "../context/roomContext";
import roomContext from "../context/roomContext";

const Guests = (props) => {
  const { setguests, guests } = useContext(RoomContext);
  const { max } = props;
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [adultArr, setAArr] = useState([]);
  const [childArr, setCArr] = useState([]);

  const popAdults = () => {
    let temp = [];
    if (children) {
      for (let i = 1; i <= max - children; i++) {
        temp.push(i);
      }
    } else {
      for (let i = 1; i <= max; i++) {
        temp.push(i);
      }
    }
    setAArr(temp);
  };

  const popChild = () => {
    let temp = [];
    if (!adults) {
      for (let i = 0; i <= max - 1; i++) {
        temp.push(i);
      }
    } else {
      for (let i = 0; i <= max - adults; i++) {
        temp.push(i);
      }
    }
    setCArr(temp);
  };

  useEffect(() => {
    popAdults();
    popChild();
    console.log("GUESTS:", guests);
  }, [adults, children]);

  return (
    <div className="bg-gray-900">
      <div className="text-white text-2xl flex justify-evenly bg-gradient-to-r from-gray-800 to-black">
        <div className="my-auto">Adults</div>
        <div className="m-2">
          <InputLabel id="adults">(16+ yrs)</InputLabel>
          <Select
            MenuProps={{ disableScrollLock: true }}
            labelId="adults"
            id="adult_select"
            value={adults}
            label="adult"
            onChange={(e) => {
              setAdults(e.target.value);
              setguests({ ...guests, adults: e.target.value });
            }}
          >
            {adultArr.map((size, index) => {
              return (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="text-white mt-1 text-2xl flex justify-evenly bg-gradient-to-r from-gray-800 to-black">
        <div className="my-auto">Children</div>
        <div className="m-2">
          <InputLabel id="child">(0-16 yrs)</InputLabel>
          <Select
            MenuProps={{ disableScrollLock: true }}
            labelId="child"
            id="child_select"
            value={children}
            label="children"
            onChange={(e) => {
              setChildren(e.target.value);
              setguests({ ...guests, children: e.target.value });
            }}
          >
            {childArr.map((size, index) => {
              return (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Guests;
