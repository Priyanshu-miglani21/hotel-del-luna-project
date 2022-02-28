import React, { useContext } from "react";
import { Link } from "react-router-dom";
import roomContext from "../context/roomContext";
import default_img from "../room/spacejoy-FX61rYaAfCQ-unsplash.jpg";
import Rating from "@mui/material/Rating";
import { BsFillPersonFill } from "react-icons/bs";
import { MdFreeBreakfast } from "react-icons/md";
import { BiWifi } from "react-icons/bi";
import Footer from "./Footer";

const Rooms = () => {
  const { rooms } = useContext(roomContext);

  return (
    <div id="room_comp">
      <div className="main_room flex justify-center">
        <h1 className="welcome1 welcome-text text-center text-2xl sm:text-6xl text-white max-w-[50%] h-fit p-4  ">
          OUR ROOMS
          <hr className="my-3" />
          <span className="welcome-text text-xl block mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>
        </h1>
      </div>
      {/* <div className="booking"></div> */}
      <section className="rooms my-5 mx-3">
        {rooms.map((room) => {
          return (
            <div
              key={room.id}
              className="flex flex-col md:flex-row bg-white my-5 rounded-lg w-full h-full"
            >
              <div className="room_img flex-none sm:w-full md:w-[40vw] h-auto z-50">
                <img
                  src={room.imgs[0] || default_img}
                  alt="Hotel Room"
                  className="relative inset-0 rounded-t-md md:rounded-l-md md:rounded-r-none h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-3 w-full h-full">
                <div className="flex flex-wrap justify-between">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-black">
                    {room.name}
                  </h1>
                  {/* <Rating
                    className=""
                    name="read-only"
                    defaultValue={parseFloat(room.rating)}
                    precision={0.5}
                    readOnly
                  /> */}
                </div>
                <div className="py-2 mt-1">
                  {room.description.slice(0, 200)}...
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap justify-between mt-7 mb-2 lg:mt-12">
                  <div className="flex justify-center bg-gradient-to-b from-gray-900 to-black rounded-md py-2 px-3 shadow-lg shadow-cyan-900/80">
                    <div className="mr-1">
                      <h1 className="font-extrabold text-sm text-white">
                        MAX GUESTS
                      </h1>
                      <div className="flex">
                        <BsFillPersonFill size={40} className="text-white " />
                        <span className="inline text-xl text-white font-bold mt-2">
                          x {room.max}
                        </span>
                      </div>
                    </div>
                    <div className="mx-2">
                      <h1 className="font-extrabold text-sm text-white">
                        FREE WIFI
                      </h1>
                      <div className="flex justify-center">
                        <BiWifi size={40} className="text-white" />
                      </div>
                    </div>
                    <div className="mx-2">
                      <h1 className="font-extrabold text-sm text-white">
                        FREE BREAKFAST
                      </h1>
                      <div className="flex justify-center">
                        <MdFreeBreakfast size={40} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 mb-3">
                    <Link
                      className="font-bold text-2xl sm:text-3xl lg:text-4xl p-4 text-black md:p-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl shadow-xl shadow-black/30"
                      to={`room/${room.name}`}
                    >
                      ₹{room.price}
                      <span className="text-gray-800 text-xl">/night</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <Footer />
    </div>
  );
};

export default Rooms;
