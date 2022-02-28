import React, { Component } from "react";
import { CircularProgress, Rating } from "@mui/material";
import Dashboard from "./Dashboard";

export default class Revs extends Component {
  state = {
    loading: true,
    rating: 5,
    comments: "",
  };

  postRating = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, loading: true });
    console.log(this.state);
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/reviews/postRating",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          rating: this.state.rating,
          comments: this.state.comments,
        }),
      }
    );

    const data = await response.json();
    if (data.status === "ok") {
      console.log(data.status);
      const rating = await this.getAllRatings();
      this.setState({ reviews: rating, loading: false });
    } else if (data.status === "updated") {
      console.log(data.status);
      const rating = await this.getAllRatings();
      this.setState({ reviews: rating, loading: false });
    } else {
      console.log(data.error);
    }
    this.setState({ ...this.state, comments: "", loading: false });
    return;
  };

  getAllRatings = async () => {
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/reviews/getAllRatings",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      return data.reviews;
    } else {
      console.log(data.error);
      return;
    }
  };

  async componentDidMount() {
    const data = await this.getAllRatings();
    console.log(data);
    this.setState({ reviews: data, loading: false });
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        <section className="bg-gradient-to-tr from-white to-gray-300 my-4 mx-2 py-2 px-3  rounded-sm">
          <h1 className="text-6xl text-black font-extrabold">RATE US:</h1>
          <div className="rating-section py-3 px-2">
            <form onSubmit={this.postRating}>
              <Rating
                name="simple-controlled"
                size="large"
                value={this.state.rating}
                className="bg-gradient-to-b from-gray-900 to-black p-3 rounded-lg"
                precision={0.5}
                onChange={(event, newValue) => {
                  this.setState({ ...this.state, rating: newValue });
                }}
              />
              <div className="p-2 mt-3">
                <label htmlFor="floatingTextarea" className=" text-xl">
                  Post A Review
                </label>
                <div className="flex justify-center justify-items-center align-middle">
                  <textarea
                    className="form-control shadow-xl shadow-black/40 focus:outline-none focus:border-0 outline-none mt-2"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    value={this.state.comments}
                    onChange={(e) =>
                      this.setState({ ...this.state, comments: e.target.value })
                    }
                  ></textarea>
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-gradient-to-b from-gray-900 to-black p-4 text-white rounded-2xl mx-2"
                  />
                </div>
                <h1 className="text-red-600 font-bold mt-3">
                  (Note: This will overwrite your previous review!)
                </h1>
              </div>
            </form>
          </div>
          <div className="my-6">
            <h1 className="text-4xl font-extrabold mb-4">User Reviews</h1>
            <div className="scrollable-revs">
              {this.state.loading ? (
                <div className="flex justify-center mt-3">
                  <CircularProgress color="warning" className="text-6xl" />
                </div>
              ) : (
                <div>
                  {this.state.reviews.map((rev) => {
                    return (
                      <div
                        key={rev._id}
                        className="bg-gradient-to-r from-black to-gray-900 p-2 shadow-xl shadow-black/30 border-b-2 border-white"
                      >
                        <div className="flex p-2 text-white">
                          <Dashboard name={rev.name ? rev.name : "JD"} />

                          <h1 className="text-xl font-extrabold ml-2 p-1">
                            {rev.name
                              ? rev.name[0].toUpperCase() + rev.name.slice(1)
                              : "JOHN DOE"}
                          </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row my-2 text-white">
                          <Rating
                            name="simple-controlled"
                            size="small"
                            value={rev.rating ? rev.rating : 5}
                            readOnly
                            className="mx-3 bg-gradient-to-l from-gray-900 to-purple-900 p-3 w-32 sm:w-none rounded-full "
                            precision={0.5}
                          />
                          <h1 className=" text-lg sm:text-xl p-2 ">
                            {rev.comments ? rev.comments : "hello world🤖"}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
