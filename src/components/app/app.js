import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";
import styled from "styled-components";

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Going to learn React",
          important: false,
          liked: false,
          id: "id1",
        },
        {
          label: "That is so good",
          important: false,
          liked: false,
          id: "id2",
        },
        {
          label: "I need a break...",
          important: false,
          liked: false,
          id: "id3",
        },
      ],
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLike = this.onToggleLike.bind(this);
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      liked: false,
      id: this.generateUnicId(),
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  }

  updateDataState(data, index, newItem = "") {
    const before = [...data.slice(0, index)];
    const after = data.slice(index + 1);
    let newArr = [];

    if (newItem) newArr = [...before, newItem, ...after];
    else newArr = [...before, ...after];

    return {
      data: newArr,
    };
  }

  generateUnicId() {
    return "id" + Date.now();
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      //так делать нельзя,потому что мы физически изменяем стейт(напрямую)
      /*data.splice(index, 1);
      return {
        data: data,
      };*/

      return this.updateDataState(data, index);
    });
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newItem = {
        ...data[index],
        important: !data[index].important,
      };

      return this.updateDataState(data, index, newItem);
    });
  }

  onToggleLike(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newItem = {
        ...data[index],
        liked: !data[index].liked,
      };

      return this.updateDataState(data, index, newItem);
    });
  }

  render() {
    const { data } = this.state;
    const amountOfPosts = data.length;
    const likedPosts = data.filter((elem) => elem.liked).length;

    return (
      <AppBlock>
        <AppHeader amountOfPosts={amountOfPosts} likedPosts={likedPosts} />
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList
          posts={data}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLike={this.onToggleLike}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
