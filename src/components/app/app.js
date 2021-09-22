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
    this.onToggleLike = this.onToggleLike.bind(this);
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      //так делать нельзя,потому что мы физически изменяем стейт(напрямую)
      /*data.splice(index, 1);
      return {
        data: data,
      };*/

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];
      return {
        data: newArr,
      };
    });
  }

  generateUnicId() {
    return "id" + Date.now();
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



  onToggleLike(id) {
    console.log(id);
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newItem = {
        label: data[index].label,
        important: data[index].important,
        liked: !data[index].liked,
        id: data[index].id,
      };

      const before = [...data.slice(0, index), newItem];
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];
      return {
        data: newArr,
      };
    });
    console.log(this.state.data);
  }

  countLikedPosts() {
    return this.state.data.reduce((count, elem) => {
      if (elem.liked) ++count;
      return count;
    }, 0);
  }

  render() {
    const { data } = this.state;
    return (
      <AppBlock>
        <AppHeader
          amountOfPosts={this.state.data.length}
          likedPosts={this.countLikedPosts()}
        />
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList
          posts={data}
          onDelete={this.deleteItem}
          onToggleLike={this.onToggleLike}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
