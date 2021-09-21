//Parent
import React, { Component } from "react";
import PostButtons from "../post-buttons";

import "./post-list-item.css";

export default class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      important: false,
      like: false,
    };
  }

  onImportantCallback = (childData) => {
    this.setState(({ important }) => ({
      important: childData,
    }));
  };

  onLikeCallback = (childData) => {
    this.setState(({ like }) => ({
      like: childData,
    }));
  };

  render() {
    const { important, like } = this.state;

    const { label, onDelete } = this.props;

    let classNames = "app-list-item d-flex justify-content-between";

    //here i use 'important' and 'like' from child component that i want to use.

    if (important) {
      classNames += " important";
    }
    if (like) {
      classNames += " like";
    }

    return (
      <div className={classNames}>
        <span className="app-list-item-label">{label}</span>
        <div className="d-flex justify-content-center align-items-center">
          <PostButtons
            onImportantCallback={this.onImportantCallback}
            onLikeCallback={this.onLikeCallback}
            onDelete={onDelete}
          />
        </div>
      </div>
    );
  }
}
