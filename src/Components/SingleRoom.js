import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RoomContext from "../context/roomContext";
import Revs from "./Revs";
import { CircularProgress, Modal, Box, Fade, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Background from "./Background";
import default_img from "../room/spacejoy-FX61rYaAfCQ-unsplash.jpg";
import { FaSnowflake, FaBath, FaConciergeBell } from "react-icons/fa";
import { BiWifi } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import { MdDining, MdBrunchDining } from "react-icons/md";
import { GiBathtub } from "react-icons/gi";
import { format } from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import SnackBar from "./SnackBar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Guests from "./Guests";
import Footer from "./Footer";

const SingleRoom = () => {
  const [room, setRoom] = useState("");
  const { roomName } = useParams();
  const { getRoom, guests, setguests } = useContext(RoomContext);
  const [loading, setLoading] = useState(true);

  // ! ROOM STATES:
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(
    new Date().setDate(checkin.getDate() + 1)
  );
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(null);

  const unLoad = () => {
    setTimeout(() => setLoading(false), 4000);
  };
  // * SnackBar:

  const [snack, setSnack] = useState(false);
  const [tag, settag] = useState("error");
  const [snackError, seterror] = useState("");

  // * IMAGE Modal:
  const [open, setOpen] = useState(false);
  const [myindex, setIndex] = useState(0);
  const handleOpen = (e) => {
    setIndex(e.target.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //* Modal Style:

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // minWidth: "60%",
    maxWidth: "70%",
    bgcolor: "black",
    outline: "none",
    border: "none",
    boxShadow: 100,
    p: 0,
  };

  // ! Dates:
  const [discount, setDis] = useState("");
  // *Modal
  const [dateModal, setdateModal] = useState(false);
  const [dateModalError, setdateModalError] = useState("");
  const dateStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "60%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  const closeDateModal = () => {
    setdateModal(false);
  };

  const formatDates = (start) => {
    return format(start, "MM/dd/yyyy");
  };

  const updateDates = async () => {
    let start = new Date(checkin);
    let end = new Date(checkout);
    let id = room.id;

    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/rooms/findBestPrice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start,
          end,
          id,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      // console.log(data);
      setNights(data.numberOfNights);
      setTotal(data.totalPrice);
      setDis(data.discount);
    } else {
      setdateModalError(data.error ? data.error : "ROOM CAN'T BE BOOKED");
      setdateModal(true);
      return;
    }
    setSnack(false);
    window.location.href = "#bookingSumm";
  };

  const submitDates = (e) => {
    e.preventDefault();
    updateDates();
  };

  // ! BOOK :
  const [bookMod, setBookMod] = useState(false);
  const [bookError, setbookError] = useState("");

  const closeBook = () => {
    setBookMod(false);
  };

  const bookMyRoom = async () => {
    if (guests.children >= 0 && guests.adults > 0) {
      if (localStorage.getItem("token")) {
        let start = new Date(checkin);
        let end = new Date(checkout);
        let id = room.id;
        let adults = guests.adults;
        let children = guests.children;

        const response = await fetch(
          "https://hotel-del-luna-miglani.herokuapp.com/rooms/checkRoom",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start,
              end,
              id,
              adults,
              children,
            }),
          }
        );
        const data = await response.json();
        if (data.status === "ok") {
          // console.log(data);
          const {
            numberOfNights,
            totalPrice,
            discount,
            checkin,
            checkout,
            roomName,
            adults,
            children,
          } = data;
          setNights(numberOfNights);
          setTotal(totalPrice);
          setDis(discount);

          window.location.href = `/booking?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&total=${totalPrice}&nights=${numberOfNights}&roomName=${roomName}`;
        } else {
          setbookError(data.error ? data.error : "ROOM CAN'T BE BOOKED");
          setBookMod(true);
          return;
        }
      } else {
        setbookError("Please, sign up before booking the room!");
        setBookMod(true);
        setTimeout(() => (window.location.href = "/register"), 2000);
      }
    } else {
      setbookError("Please, fill out the no. of adults & children");
      // window.location.href = "#bookingSumm";
      setBookMod(true);
    }
  };
  useEffect(() => {
    setRoom(getRoom(roomName));
    // console.log("to:", total);
    // console.log("big:", nights);
    return () => {
      setRoom({});
      setguests({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {room ? (
        <div id="singleRoom">
          {(document.body.scrollTop = 0)}
          <SnackBar open={snack} tag={tag} error={snackError} />
          <div className="top">
            <Background bg={room.imgs[0]}>
              <h1 className="welcome1 welcome-text text-center text-2xl sm:text-6xl text-white max-w-[50%] h-fit p-4  ">
                {room.name}
                <hr className="my-3" />
                <span className="welcome-text text-xl block mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </span>
              </h1>
            </Background>
            <section
              id="dates_section"
              className="relative bottom-0 border-y-2 border-black bg-gradient-to-r from-red-700 to-red-800 w-full mx-auto p-2"
            >
              <form
                onSubmit={submitDates}
                id="dates"
                className="flex justify-center justify-items-center"
              >
                <Modal
                  open={dateModal}
                  onClose={closeDateModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={dateStyle}>
                    <button
                      onClick={closeDateModal}
                      className="absolute text-white bg-red-700/70 top-2 right-2 p-1"
                    >
                      ✖
                    </button>
                    <h1 className="text-2xl sm:text-3xl text-red-700">
                      <ErrorOutlineIcon className="text-red-700 m-2 scale-125" />
                      ERROR
                    </h1>
                    <h1 className="text-lg sm:text-xl text-white my-2">
                      {dateModalError}
                    </h1>
                  </Box>
                </Modal>

                <div className="w-56 m-2 p-2 rounded-md ">
                  <h1 className="checks text-sm text-white mb-3">
                    Check-in {"  "}
                  </h1>
                  <div className="bg-gray-900 shadow-xl shadow-red-900/40">
                    <DatePicker
                      label="Check-in"
                      value={checkin}
                      minDate={new Date()}
                      onChange={(val) => {
                        setCheckin(val);
                      }}
                      renderInput={(params) => (
                        <TextField
                          color="primary"
                          className="dark"
                          focused
                          {...params}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-56 m-2 p-2 rounded-md ">
                  <h1 className="checks text-sm text-white mb-3">Check-out</h1>
                  <div className="bg-gray-900 shadow-xl shadow-red-900">
                    <DatePicker
                      label="Check-out"
                      value={checkout}
                      minDate={new Date(checkin).setDate(checkin.getDate() + 1)}
                      onChange={(val) => {
                        setCheckout(val);
                      }}
                      renderInput={(params) => (
                        <TextField
                          color="primary"
                          className="dark"
                          focused
                          {...params}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="my-auto mx-2 ">
                  <input
                    type="submit"
                    value="Update Price"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 font-extrabold text-white p-3 rounded-md shadow-xl shadow-gray-900/50"
                  />
                </div>
              </form>
            </section>
          </div>

          <section className="room-images my-3 mx-5">
            <div className="flex flex-wrap justify-evenly">
              {room.imgs.map((img, index) => {
                if (index > 0) {
                  return (
                    <div key={index} className="mx-1 my-1 w-72 sm:w-64">
                      <img
                        src={img || default_img}
                        className="room_imgs w-full cursor-pointer rounded-sm"
                        id={index}
                        onClick={handleOpen}
                        alt="Hotel Del Luna Rooms"
                      />
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        closeAfterTransition
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                            <button
                              onClick={handleClose}
                              type="button"
                              className="absolute right-0 text-white text-2xl bg-red-700/60 px-2"
                            >
                              ✖
                            </button>
                            <img
                              src={room.imgs[myindex] || default_img}
                              alt="hotel images🛎"
                            />
                          </Box>
                        </Fade>
                      </Modal>
                    </div>
                  );
                }
              })}
            </div>
          </section>

          <section className="bg-gradient-to-b from-gray-50 to-gray-300  my-4 mx-2 py-2 px-3  rounded-sm">
            <h1 className="text-black font-extrabold text-5xl sm:text-6xl py-2 px-3 ">
              {room.name}
            </h1>
            <hr className="my-1" />
            <div className="flex flex-col md:flex-row my-3 justify-evenly">
              <div className="p-0 sm:p-2 flex-1 ">
                <div className="px-3 py-3">
                  <p className="text-xl ">{room.description}</p>
                </div>
                <div className="p-3 sm:mr-2 my-3 bg-gradient-to-b from-gray-900 to-black rounded-md shadow-xl shadow-gray-700/40">
                  <h1 className="font-extrabold text-3xl text-white text-center underline">
                    Room Features
                  </h1>
                  <div className="p-2 flex justify-around">
                    <div className="left">
                      <div className="m-1 flex justify-center align-left">
                        <BiWifi
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Free Wifi
                        </span>
                      </div>
                      <div className="m-1 flex justify-between align-middle">
                        <FaSnowflake
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          A.C Rooms
                        </span>
                      </div>
                      <div className="m-1 flex justify-center align-middle">
                        <RiComputerLine
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Cable Tv
                        </span>
                      </div>
                      <div className="m-1 flex justify-center align-middle">
                        <FaBath
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Bath / shower
                        </span>
                      </div>
                    </div>

                    <div className="right m-2">
                      <div className="m-1 flex justify-center align-middle">
                        <MdBrunchDining
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Free Breakfast
                        </span>
                      </div>
                      <div className="m-1 flex justify-center align-middle">
                        <FaConciergeBell
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Room service
                        </span>
                      </div>
                      <div className="m-1 flex justify-center align-middle">
                        <MdDining
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Dining area
                        </span>
                      </div>

                      <div className="m-1 flex justify-center align-middle">
                        <GiBathtub
                          size={25}
                          className="text-white m-auto flex-1"
                        />
                        <span className="inline text-md md:text-lg m-1 text-white flex-1">
                          Complimentary toiletries
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="bookingSumm"
                className="p-3 mx-3 sm:mx-4 my-2 h-max flex-initial rounded-md bg-gradient-to-b from-blue-200 to-gray-100 shadow-xl shadow-gray-700/90"
              >
                <div className="p-2">
                  <div className="bg-gray-900 rounded-md my-2 p-1 h-full">
                    <Guests max={room.max} type={room.name} id={room.id} />
                    <h2 className="text-black bg-blue-400 border-b-2 border-black p-2 font-semibold font-mono text-3xl">
                      Booking Summary
                    </h2>
                    <div className="p-2 bg-white text-black text-xl ">
                      <ul>
                        <li className="my-1 border-b-2 border-black font-mono">
                          <span className="font-extrabold ">Dates: </span>
                          <span className=" mr-1 font-mono">
                            {checkout
                              ? `${formatDates(checkin)} - ${formatDates(
                                  checkout
                                )}`
                              : " "}
                          </span>
                        </li>
                        <li className="my-1 border-b-2 border-black font-mono">
                          <span className="font-extrabold mr-1">
                            Nights: {nights}
                          </span>
                        </li>
                        <li className="my-1 border-b-2 border-black font-mono">
                          <span className="font-extrabold mr-1">Type:</span>{" "}
                          {room.name}
                        </li>
                        <li className="my-1 border-b-2 border-black font-mono">
                          <span className="mr-1 font-extrabold font-mono">
                            {guests
                              ? `${
                                  guests.adults ? guests.adults : ""
                                } Adult(s), ${
                                  guests.children ? guests.children : "0"
                                } ${guests.children > 1 ? "Children" : "Child"}`
                              : " "}
                          </span>
                        </li>
                        <li className="my-1 border-b-2 border-black font-mono">
                          <span className="font-extrabold mr-1">Discount:</span>{" "}
                          {discount ? `${discount * 1000}%` : "0%"}
                        </li>
                        <li className="mt-3 p-1 text-white flex justify-between font-extrabold text-2xl rounded-sm bg-red-600">
                          Total:{" "}
                          <span className="text-2xl sm:text-4xl m">
                            ₹{total ? total : room.price}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Modal
                    open={bookMod}
                    onClose={closeBook}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={dateStyle}>
                      <button
                        onClick={closeBook}
                        className="absolute text-white bg-red-700/70 top-2 right-2 p-1"
                      >
                        ✖
                      </button>
                      <h1 className="text-2xl sm:text-3xl text-red-700">
                        <ErrorOutlineIcon className="text-red-700 m-2 scale-125" />
                        ERROR
                      </h1>
                      <h1 className="text-lg sm:text-xl text-white my-2">
                        {bookError}
                      </h1>
                    </Box>
                  </Modal>
                  <button
                    type="button"
                    onClick={bookMyRoom}
                    className="mt-4 hover:bg-yellow-400 font-extrabold rounded-md shadow-xl shadow-gray-900/50 bg-yellow-500 p-3 text-2xl"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Revs />
          <Footer />
        </div>
      ) : (
        <div className="p-5 text-center">
          {loading ? (
            <CircularProgress color="warning" size={100} />
          ) : (
            <>
              <h1 className="text-6xl text-white">🔍NO SUCH ROOM FOUND...</h1>
              <div className="m-5">
                <Link
                  to="/rooms"
                  className="text-white p-4 rounded-sm shadow-xl shadow-pink-500/40 sm:p-8 sm:text-xl bg-gradient-to-r from-red-400 to-fuchsia-800"
                >
                  Go Back to Rooms🔙
                </Link>
              </div>
            </>
          )}
          {unLoad()}
        </div>
      )}
    </div>
  );
};

export default SingleRoom;
