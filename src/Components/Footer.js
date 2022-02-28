import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer font-small special-color-dark pt-4">
      <div className="container">
        <ul className="list-unstyled list-inline text-center">
          <li className="list-inline-item">
            <a className="btn-floating btn-fb mx-1">
              {/* <i className="fab fa-facebook-f"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-tw mx-1">
              {/* <i className="fab fa-twitter"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-gplus mx-1">
              {/* <i className="fab fa-google-plus-g"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-li mx-1">
              {/* <i className="fab fa-linkedin-in"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-dribbble mx-1">
              {/* <i className="fab fa-dribbble"> </i> */}
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copyright text-center py-3 text-white text-3xl bg-gradient-to-r from-cyan-600 to-green-600">
        © 2022 Copyright:
        <h1 className="inline mx-2 font-extrabold text-white text-4xl">
          {" "}
          HOTEL DEL LUNA
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
