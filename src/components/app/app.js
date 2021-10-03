import React, { Component } from "react";

import PostItemInfo from "../postItemInfo";
import MainPage from "../mainPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

export default class App extends Component {
  render() {
    const body =
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod explicabo nihil iusto quam impedit. Quisquam quam ex et adipisci impedit corrupti, autem recusandae magni, praesentium labore minus quo cumque voluptates neque? Autem nisi quibusdam nemo labore odio praesentium doloremque, saepe, repudiandae deleniti veniam nulla qui, quia excepturi dignissimos blanditiis officia!";
    const title = "Title!";

    return (
      <Router>
        <div className="app">
          <Route path="/" component={MainPage} exact />
          <Route
            path="/post"
            render={() => {
              return <PostItemInfo body={body} title={title}></PostItemInfo>;
            }}
          />
        </div>
      </Router>
    );
  }
}
