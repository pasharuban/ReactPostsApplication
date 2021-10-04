import React, { Component } from "react";

import "./post-add-form.css";

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      body: "",
    };

    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onTextareaValueChange = this.onTextareaValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputValueChange(e) {
    this.setState({ label: e.target.value });
  }

  onTextareaValueChange(e) {
    this.setState({ body: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { onAdd } = this.props;
    const { label, body } = this.state;
    onAdd(label, body);
    this.setState({ label: "", body: "" });
  }

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Заголовок..."
          className="form-control new-post-label"
          onChange={this.onInputValueChange}
          value={this.state.label}
          required
        />
        <textarea
          type="text"
          className="new-post-content form-control"
          placeholder="Содержимое статьи..."
          required
          onChange={this.onTextareaValueChange}
          value={this.state.body}
        ></textarea>
        <button type="submit" className="btn btn-outline-secondary">
          {" "}
          Добавить
        </button>
      </form>
    );
  }
}
