import React, { Component } from "react";
import PostButtons from "../post-buttons";
import BackButton from "../back-button";
import "./postItemInfo.scss";

export default class PostItemInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, body } = this.props;
    return (
      <>
        <BackButton></BackButton>
        <div className="postBlock">
          <h1 className="title-of-post">{title}</h1>

          <p className="body-of-post">{body}</p>
          <div className="post-block-buttons">
            <PostButtons></PostButtons>
          </div>
        </div>
      </>
    );
  }
}
