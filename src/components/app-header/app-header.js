import React from "react";

//import "./app-header.css";
import "./app.-header.scss";
const AppHeader = ({ amountOfPosts, likedPosts }) => {
  let text = "записей";
  if (amountOfPosts % 10 >= 2 && amountOfPosts % 10 <= 4) text = "записи";
  if (amountOfPosts % 10 === 1) text = "запись";
  return (
    <div className="app-header d-flex">
      <h1>Paul Ruban</h1>
      <h2>
        {amountOfPosts} {text}, из них понравилось: {likedPosts}
      </h2>
    </div>
  );
};
export default AppHeader;
