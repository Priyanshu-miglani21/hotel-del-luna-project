import React, { useContext } from "react";
import img1 from "../room/ralph-ravi-kayden-zSG-kd-L6vw-unsplash.jpg";
import img2 from "../room/alexander-kaunas-67-sOi7mVIk-unsplash.jpg";
import img3 from "../room/the-anam-ZNBQMS7amVo-unsplash.jpg";
import default_img from "../room/spacejoy-FX61rYaAfCQ-unsplash.jpg";
import { MdBreakfastDining } from "react-icons/md";
import { BiWifi } from "react-icons/bi";
import { FaCocktail, FaShuttleVan } from "react-icons/fa";
import Footer from "./Footer";
import RoomContext from "../context/roomContext";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Home = () => {
  const { rooms } = useContext(RoomContext);
  // console.log(rooms);
  return (
    <div id="home_comp">
      <div className="main">
        <h1 className="welcome1 welcome-text text-2xl sm:text-5xl text-white max-w-[40%] p-3  ">
          <span className="welcome-text text-3xl sm:text-6xl p-0 m-0">W</span>
          ELCOME TO HOTEL DEL LUNA
          <hr />
          <span className="welcome-text text-xl block mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>
        </h1>
      </div>
      <main>
        <section className="info h-full">
          <h1 className="welcome-text mt-20 sm:mt-44 text-white text-center text-4xl mx-8 sm:text-6xl">
            In The Heart of Rajasthan
          </h1>
          <div id="imgs" className="mt-20">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={img1}
                    className="d-block w-[50%] mx-auto"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={img2}
                    className="d-block w-[50%] mx-auto"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={img3}
                    className="d-block w-[50%] mx-auto"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="welcome-text text-white text-md sm:text-xl my-4  mx-5 sm:mx-40 p-16">
            Located in the Pink City Jaipur, Hotel Del Luna is one of the best
            budget 5 star hotels in Jaipur since 1981. Hotel Del Luna opened its
            door in 1981. with the aim of achieving excellent customer service
            by providing a truly unique experience to the guests with a
            hospitality that caters to their every need. A traditionally
            architectural hotel with all the modern amenities will make you feel
            the taste of Jaipur, and provide you comfort. Boasting its well
            equipped 35 Rooms with all the modern amenities and heritage hand
            crafted paintings, the hotel will make you smile. Ranging with every
            budget the hotel offers different kinds of room, fitting for every
            pocket. Our hotel lays emphasis on quality and understated elegance.
            From leisure trips to extended business stays, our personalized
            services offer you unmatched charisma.
          </div>
        </section>
        <section className="h-full">
          <h1 className="welcome-text mt-16 sm:mt-24 text-white text-center text-4xl sm:text-6xl">
            Our Services
          </h1>

          <div className="services grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-2 xl:p-12">
            <div className="service-card text-center flex justify-center align-top rounded-lg sm:shadow-xl sm:shadow-gray-700/40 mx-2 my-9 p-16">
              <div className="border-r-emerald-600 p-5 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-2xl text-white m-auto">
                <BiWifi size={50} className="my-2 mx-auto" />
                Free Wifi
                <span className="text-sm block my-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  quasi?
                </span>
              </div>
            </div>

            <div className="service-card2 text-center flex justify-center align-top rounded-lg sm:shadow-xl sm:shadow-gray-700/40 mx-2 my-9 p-16">
              <div className="border-r-emerald-600 p-5 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-2xl text-white m-auto">
                <MdBreakfastDining size={50} className="my-2 mx-auto" />
                Free Breakfast
                <span className="text-sm block my-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  quasi?
                </span>
              </div>
            </div>
            <div className="service-card3 text-center flex justify-center align-top rounded-lg sm:shadow-xl sm:shadow-gray-700/40 mx-2 my-9 p-16">
              <div className="border-r-emerald-600 p-5 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-2xl text-white m-auto">
                <FaCocktail size={50} className="my-2 mx-auto" />
                Free Cocktails
                <span className="text-sm block my-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  quasi?
                </span>
              </div>
            </div>
            <div className="service-card4 text-center flex justify-center align-top rounded-lg sm:shadow-xl sm:shadow-gray-700/70 mx-2 my-9 p-16">
              <div className="border-r-emerald-600 p-5 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-2xl text-white m-auto">
                <FaShuttleVan size={50} className="my-2 mx-auto" />
                Free Shuttle
                <span className="text-sm block my-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  quasi?
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="h-full rooms flex flex-col justify-center">
          <h1 className="welcome-text mt-16 sm:mt-24 text-white text-center text-4xl sm:text-6xl">
            Featured Rooms
          </h1>
          <div className=" mt-14 mx-auto flex flex-col lg:flex-row">
            {rooms.map((room) => {
              if (room.featured) {
                return (
                  <Link
                    className="featured_rooms m-2 cursor-pointer p-2 "
                    key={room.id}
                    to={`/rooms/room/${room.name}`}
                  >
                    <Card
                      sx={{ maxWidth: 400 }}
                      className=" h-full w-full justify-self-center "
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        className="select-none"
                        image={room.imgs[1] || default_img}
                        alt="Hotel Rooms"
                      />
                      <CardContent className="bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800">
                        <h1 className="text-center welcome-text text-2xl uppercase  text-gray-100">
                          {room.name}
                        </h1>
                      </CardContent>
                    </Card>
                  </Link>
                );
              }
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
