import React from "react";

//import "./app-header.css";
import "./app.-header.scss";
const AppHeader = ({ amountOfPosts, likedPosts }) => {
  return (
    <div className="app-header d-flex">
      <h1>Paul Ruban</h1>
      <h2>
        {amountOfPosts} записей, из них понравилось: {likedPosts}
      </h2>
    </div>
  );
};
export default AppHeader;
