import React, { Component } from "react";

import "./post-add-form.css";

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e) {
    this.setState({ label: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { onAdd } = this.props;
    const { label } = this.state;
    onAdd(label);
    this.setState({ label: "" });
  }

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="О чем вы думаете сейчас?"
          className="form-control new-post-label"
          onChange={this.onValueChange}
          value={this.state.label}
          required
        />
        <button type="submit" className="btn btn-outline-secondary">
          {" "}
          Добавить
        </button>
      </form>
    );
  }
}
