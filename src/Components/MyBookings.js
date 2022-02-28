import React, { useState, useContext, useEffect } from "react";
import RoomContext from "../context/roomContext";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { BsPersonFill } from "react-icons/bs";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getMyBookings } = useContext(RoomContext);

  const formatDates = (mydate) => {
    const date = new Date(mydate);
    return format(date, "MM/dd/yyyy");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchFn = async () => {
        const data = await getMyBookings();
        setBookings(data.bookings);
        setLoading(false);
        // console.log(data.bookings);
      };
      fetchFn();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-16">
      <div className="p-3">
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress color="warning" className="text-6xl" />
          </div>
        ) : bookings.length !== 0 ? (
          bookings.map((booking, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-900 to-red-700 p-3 rounded-lg my-2"
              >
                <span className="text-fuchsia-500 font-extrabold text-4xl">
                  {booking.room}
                </span>

                <div className="flex flex-col lg:flex-row justify-between justify-items-center align-middle p-7">
                  <div className="flex flex-col sm:flex-row justify-evenly">
                    <div className="flex sm:justify-evenly justify-around sm:flex-col justify-items-center m-2">
                      <h1 className=" mx-1 text-lg sm:text-3xl text-white font-extrabold ">
                        CHECK-IN
                      </h1>

                      <h1 className=" mx-1 text-2xl sm:text-3xl text-white">
                        {formatDates(booking.check_in)}
                      </h1>
                    </div>
                    <div className="flex sm:justify-evenly justify-around sm:flex-col justify-items-center m-2">
                      <h1 className=" mx-1 text-lg sm:text-3xl text-white font-extrabold ">
                        CHECK-OUT
                      </h1>

                      <h1 className=" mx-1 text-2xl sm:text-3xl text-white">
                        {formatDates(booking.check_out)}
                      </h1>
                    </div>
                    <div className="flex sm:justify-evenly justify-around sm:flex-col justify-items-center m-2">
                      <h1 className="text-lg sm:text-3xl text-white font-extrabold ">
                        ADULTS
                      </h1>
                      <div className="flex align-middle">
                        <BsPersonFill size={30} className="text-blue-500" />
                        <h1 className=" text-2xl sm:text-3xl text-white mx-1">
                          {booking.adults}
                        </h1>
                      </div>
                    </div>
                    <div className="flex sm:justify-evenly justify-around sm:flex-col justify-items-center m-2">
                      <h1 className="text-lg sm:text-3xl text-white font-extrabold ">
                        CHILDREN
                      </h1>
                      <div className="flex align-middle">
                        <BsPersonFill size={30} className="text-blue-500" />
                        <h1 className=" text-2xl sm:text-3xl text-white mx-1">
                          {booking.children}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="mx-1 mt-10 xl:my-auto">
                    <h1 className=" text-3xl sm:text-5xl text-white">
                      Rs.{booking.total}
                    </h1>
                    <h1
                      className={` text-2xl mt-1 text-center rounded-md p-2 shadow-xl shadow-black/40 text-white bg-gradient-to-r ${
                        booking.status === "Waiting"
                          ? "from-gray-900 to-black"
                          : booking.status === "Approved"
                          ? "from-green-600 to-green-900"
                          : "from-red-700 to-red-900"
                      }
                      `}
                    >
                      {booking.status}
                    </h1>
                  </div>
                </div>
                <h1 className=" text-md text-white bg-emerald-600 p-1 ">
                  Booked On: {formatDates(booking.createdAt)}
                </h1>
              </div>
            );
          })
        ) : (
          <h1 className="text-4xl sm:text-6xl text-white text-center">
            🧐NO BOOKINGS FOUND!
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
