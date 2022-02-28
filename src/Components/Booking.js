import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Modal, Box } from "@mui/material";
import { format } from "date-fns";
import { BsClockFill, BsPersonFill } from "react-icons/bs";
import RoomContext from "../context/roomContext";

const Booking = () => {
  const navigate = useNavigate();

  const { getUserInfo } = useContext(RoomContext);

  const [readO, setReadO] = useState(false);
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [mobile, setmobile] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [mail, setmail] = useState("");

  const search = useLocation().search;
  const checkin = new URLSearchParams(search).get("checkin");
  const checkout = new URLSearchParams(search).get("checkout");
  const total = new URLSearchParams(search).get("total");
  const nights = new URLSearchParams(search).get("nights");
  const roomName = new URLSearchParams(search).get("roomName");
  const adults = new URLSearchParams(search).get("adults");
  const children = new URLSearchParams(search).get("children");

  const [bookMod, setBookMod] = useState(false);
  const [bookTitle, setbookTitle] = useState("");
  const [bookError, setbookError] = useState("");

  const closeBook = () => {
    setBookMod(false);
    navigate("/mybookings");
  };
  const dateStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 7,
  };

  // MODAL:
  const [modal, setmodal] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "99%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 5,
  };

  const closemodal = () => {
    setmodal(false);
  };

  const formatDates = (mydate) => {
    const date = new Date(mydate);
    return format(date, "MM/dd/yyyy");
  };

  const bookRoom = async (e) => {
    e.preventDefault();
    console.log(first, last, mobile, state, country, mail);
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/rooms/bookRoom",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          first,
          last,
          mobile,
          mail,
          state,
          country,
          checkin,
          checkout,
          total,
          roomName,
          adults,
          children,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      // console.log(data.room);
      setbookTitle("✔ SUCCESS");
      setbookError(data.message);
      setBookMod(true);
    } else {
      setbookTitle("❌ ERROR");
      setbookError(data.message);
      setBookMod(true);
      console.log(data.error);
    }
  };

  const getInfo = async () => {
    const data = await getUserInfo();
    // console.log(data);
    if (data.status === "ok") {
      const { firstName, lastName, mail, state, country } = data.info;
      setReadO(true);
      setfirst(firstName);
      setlast(lastName);
      setmail(mail);
      setstate(state);
      setcountry(country);
    } else {
      setReadO(false);
    }
  };

  useEffect(() => {
    // console.log({
    //   checkin,
    //   checkout,
    //   total,
    //   nights,
    //   roomName,
    //   adults,
    //   children,
    // });
    getInfo();
    // printInfo();
  }, []);

  return (
    <div className="mt-20 px-3">
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
          {bookTitle.includes("SUCCESS") ? (
            <h1 className="text-2xl sm:text-3xl text-green-600 my-2">
              {bookTitle}
            </h1>
          ) : (
            <h1 className="text-2xl sm:text-3xl text-red-600 my-2">
              {bookTitle}
            </h1>
          )}
          <h1 className="text-xl sm:text-2xl text-white my-2">{bookError}</h1>
        </Box>
      </Modal>
      <Modal
        open={modal}
        onClose={closemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            onClick={closemodal}
            className="absolute text-white bg-red-700/70 top-2 right-2 p-1"
          >
            ✖
          </button>
          <div className="flex">
            <div className="m-1 px-2">
              <h1 className="text-lg sm:text-xl text-red-500 my-2 font-extrabold ">
                CHECKIN
              </h1>
              <h1 className="text-lg sm:text-xl text-white my-2 font-semibold">
                {formatDates(checkin)}
              </h1>
            </div>
            <div className="m-1 px-2">
              <h1 className="text-lg sm:text-xl text-red-500 my-2 font-extrabold ">
                CHECKOUT
              </h1>
              <h1 className="text-lg sm:text-xl text-white my-2 font-semibold">
                {formatDates(checkout)}
              </h1>
            </div>
          </div>
          <div className="flex align-middle">
            <BsClockFill className="mt-2 text-white mx-2" size={25} />
            <h1 className="text-lg sm:text-xl text-white my-2 font-medium ">
              {nights} Night(s) Stay
            </h1>
          </div>
          <div className="mx-2 my-1">
            <h1 className="text-lg sm:text-xl text-blue-700 my-2 font-medium ">
              Room:{" "}
              <span className="text-lg sm:text-2xl text-white ml-2 font-extrabold">
                {roomName}
              </span>
            </h1>
            <div className="flex">
              <BsPersonFill className="text-blue-400 mx-1" size={25} />

              <h1 className="text-lg sm:text-xl text-white font-medium mx-1 ">
                {adults} Adults,
              </h1>
              <h1 className="text-lg sm:text-xl text-white font-medium mx-1 ">
                {" "}
                {children > 1 ? `${children} Children` : `${children} Child`}
              </h1>
            </div>
          </div>
          <hr className="text-white my-3" />
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-3xl text-violet-600 font-extrabold  ">
              Total:
            </h1>
            <h1 className="text-xl sm:text-3xl text-white font-extrabold  ">
              Rs. {total}
            </h1>
          </div>
        </Box>
      </Modal>
      <h1 className="text-6xl text-white underline">#Booking Info.</h1>
      <div className="px-5 py-5 my-4 bg-gradient-to-r from-cyan-700 to-violet-700 rounded-xl">
        <div className="w-full flex">
          <form className="text-white text-xl flex-auto " onSubmit={bookRoom}>
            <div className="form-row ">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom01">
                  First name<span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="First name"
                  value={first}
                  onChange={(e) => {
                    setfirst(e.target.value);
                  }}
                  required
                  readOnly={readO}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom02">
                  Last name<span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  placeholder="Last name"
                  value={last}
                  onChange={(e) => {
                    setlast(e.target.value);
                  }}
                  required
                  readOnly={readO}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom02">
                  Email Address<span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  placeholder="Email Address"
                  value={mail}
                  onChange={(e) => {
                    setmail(e.target.value);
                  }}
                  required
                  readOnly={readO}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="mobile">Mobile No.</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile No."
                    value={mobile}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                    aria-describedby="inputGroupPrepend"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label htmlFor="validationCustom03">
                  State<span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom03"
                  placeholder="State"
                  value={state}
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                  required
                  readOnly={readO}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationCustom04">
                  Country<span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom04"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => {
                    setcountry(e.target.value);
                  }}
                  required
                  readOnly={readO}
                />
              </div>
            </div>

            <div className="">
              <button
                className="mx-1 bg-gradient-to-r from-green-700 to-green-900 shadow-xl shadow-green-600/40 rounded-md mt-5 p-3 text-2xl"
                type="submit"
              >
                Confirm Booking
              </button>
              <button
                className="mx-1 bg-gradient-to-r from-red-700 to-red-900 shadow-xl shadow-red-700/40 rounded-md mt-2 p-3 text-2xl"
                type="button"
                onClick={() => setmodal(true)}
              >
                Review Booking
              </button>
            </div>
          </form>
          <div className="w-[0vw] md:w-[30vw]">
            <img
              src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Hotel Del Luna Image"
              className="rounded-lg select-none shadow-xl shadow-black/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
