import S1 from "./Part - 3/Single/S1.jpg";
import S2 from "./Part - 3/Single/S2.jpg";
import S3 from "./Part - 3/Single/S3.jpg";
import S5 from "./Part - 3/Single/S5.jpg";
import S6 from "./Part - 3/Single/S6.jpg";

import T1 from "./Part - 3/Triple/T1.jpg";
import T2 from "./Part - 3/Triple/T2.jpg";
import T3 from "./Part - 3/Triple/T3.jpg";
import T7 from "./Part - 3/Triple/T7.jpg";
import T8 from "./Part - 3/Triple/T8.png";

import K1 from "./Part - 2/King/K1.jpg";
import K2 from "./Part - 2/King/K2.jpg";
import K5 from "./Part - 2/King/K5.jpg";
import K6 from "./Part - 2/King/K6.jpg";
import K7 from "./Part - 2/King/K7.jpg";

import Q5 from "./Part - 2/Queen/Q5.jpg";
import Q4 from "./Part - 2/Queen/Q4.jpg";
import Q6 from "./Part - 2/Queen/Q6.jpg";
import Q7 from "./Part - 2/Queen/Q7.jpg";
import Q8 from "./Part - 2/Queen/Q8.jpg";

import C10 from "./Part - 2/Cabana/C10.jpg";
import C9 from "./Part - 2/Cabana/C9.jpeg";
import C11 from "./Part - 2/Cabana/C11.jpg";
import C7 from "./Part - 2/Cabana/C7.jpg";
import C8 from "./Part - 2/Cabana/C8.jpg";

import ES3 from "./Part - 1/Executive Suite/ES3.jpg";
import ES1 from "./Part - 1/Executive Suite/ES1.jpg";
import ES5 from "./Part - 1/Executive Suite/ES5.jpg";
import ES6 from "./Part - 1/Executive Suite/ES6.jpg";
import ES9 from "./Part - 1/Executive Suite/ES9.jpg";

import PS2 from "./Part - 1/Presidential Suite/PS2.jpg";
import PS11 from "./Part - 1/Presidential Suite/PS11.jpg";
import PS10 from "./Part - 1/Presidential Suite/PS10.jpg";
import PS8 from "./Part - 1/Presidential Suite/PS8.jpg";
import PS7 from "./Part - 1/Presidential Suite/PS7.jpg";

const data = [
  {
    id: 1,
    name: "Single Room",
    imgs: [S2, S1, S3, S5, S6],
    price: 1500,
    rating: "4.5",
    max: "2",
    description:
      "It's a room for a single person and it can have one or more beds. The room can be simple and small, but it offers everything you need to ensure your stay there is as comfortable as it can be. This 37 sq mt to 45 sq mt room has a single room with bed and bathroom, it includes club facilities alongside complimentary wifi, breakfast, free cocktails and more.",
  },
  {
    id: 2,
    name: "Triple Room",
    imgs: [T8, T2, T3, T7, T1],
    price: 3000,
    rating: "4.5",
    featured: true,
    max: "4",
    description:
      "As the name suggests, a triple room in a hotel is designed to comfortably accommodate three people. It can have a fusion of either two double beds, three twin beds, or a single, double bed and a twin. The facilities in each hotel differ according to individual hotels. A triple room has three separate single beds and can be occupied by three guests. This type of room is suitable for groups and delegates of meeting and conferences, it comes with complimentary wifi, club facilities, complimentary breakfast, drinks and more.",
  },
  {
    id: 3,
    name: "Mahraja Deluxe",
    imgs: [K6, K2, K5, K1, K7],
    price: 2500,
    rating: "4.5",
    featured: true,
    max: "2",
    description:
      "Maharaja Deluxe room has a king sized bed and can comfortably accommodate one or two people. This 32 to 50 sq mt room has a king size bed with bathroom , complimentary wifi, club facilities, free drinks and breakfast. This room is suitable for people who would like to spend more of their time relaxing in the hotel.",
  },
  {
    id: 4,
    name: "Maharani Deluxe",
    imgs: [Q5, Q4, Q6, Q7, Q8],
    price: 2500,
    rating: "4.5",
    max: "2",
    description:
      "It’s a beautiful room containing a queen-size bed. The room may be occupied by one or two people. This 32 sq mt to 50 sq mt room has a single room with queen-sized bed and bathroom, it includes club facilities alongside complimentary wifi, breakfast, free drinks and more.",
  },
  {
    id: 5,
    name: "Cabana",
    imgs: [C10, C11, C7, C8, C9],
    price: 4500,
    rating: "4.5",
    max: "5",
    description:
      " Cabana rooms are located on the lobby level of the main building. They have a private pool and a splendid view. All the rooms in this category have a DVD player and television. A fully-stocked minibar, unlimited access to the Wi-Fi and hair dryer, we have impressive facilities for all kinds of guests. You can locate your room by looking for the numbers on the Azulejos, the famous blue and white tiles that are synonymous with Portuguese tradition. Spread across 29 square meter, the room is cozy as well as spacious. With the shoe shining facility and ironing bed, we have made sure that not even the smallest of your requirements go unnoticed.",
  },
  {
    id: 6,
    name: "Executive Suite",
    imgs: [ES3, ES1, ES5, ES6, ES9],
    price: 5300,
    rating: "4.5",
    featured: true,
    max: "6",
    description:
      "It's a living room connected with one or more bedrooms with a room-size of 70 sq mt. It has a separate bedroom, living area and a spacious bathroom. It includes Club facilities, a 50 % discount on airport transfers in a multi utility vehicle. These suites also include high tea from 15.30 to 17.30 hours at a pre-designated dining venue. It also has complimentary wi-fi, king sized bed and can easily accomodate 5 people.",
  },
  {
    id: 7,
    name: "Presidential Suite",
    imgs: [PS2, PS11, PS10, PS8, PS7],
    price: 5999,
    rating: "4.5",
    max: "6",
    description:
      "It's the most expensive room. A president suite always has one or more bedrooms and a living space with a strong emphasis on grand in-room decoration, high-quality amenities and supplies, and tailor-made services. Created in the honor of our Founder (Mr. Miglani), The Presidential Suite is an extravagance of exotic artefacts, lush carpets, priceless paintings, authentic colonial furniture and fine architectural detailing. A salute to the spirit that created it! ",
  },
];

export default data;
