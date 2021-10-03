import React from "react";
import { Link } from "react-router-dom";
import urlBackButton from "./back-arrow.png";

const BackButton = () => {
  return (
    <Link to="/">
      <img src={urlBackButton} alt="back"></img>
    </Link>
  );
};

export default BackButton;
