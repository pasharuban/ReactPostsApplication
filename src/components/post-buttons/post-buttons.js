//Child
import React from "react";
import { Component } from "react";

import "./post-buttons.css";

class PostButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      important: false, //this value i want to send to a Parent Component
      like: false, //this value i want to send to a Parent Component
    };

    this.onImportant = this.onImportant.bind(this); //Привязка контекста,т.к он теряется (внутри render событие onclick)
    this.onLike = this.onLike.bind(this);
  }

  async onImportant() {
    await this.setState(({ important }) => ({
      important: !important,
    }));
    this.props.onImportantCallback(this.state.important);
  }

  async onLike() {
    await this.setState(({ like }) => ({
      like: !like,
    }));
    this.props.onLikeCallback(this.state.like); //передаем в родительскую функцию(пропс) инфо о состоянии
    this.props.onToggleLike("id");
  }

  render() {
    const { onDelete } = this.props;
    return (
      <>
        <button
          type="button"
          className="btn-star btn-sm"
          //onClick={this.onImportant}
          onClick={this.onImportant}
        >
          <i className="fa fa-star"></i>
        </button>
        <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
          <i className="fa fa-trash-o"></i>
        </button>
        <i
          className="fa fa-heart"
          //onClick={this.onLike}
          onClick={this.onLike}
        ></i>
      </>
    );
  }
}

export default PostButtons;
