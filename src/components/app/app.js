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
        { label: "Going to learn React", important: true, id: "aa" },
        { label: "That is so good", important: false, id: "bb" },
        { label: "I need a break...", important: false, id: "cc" },
      ],
    };
    this.deleteItem = this.deleteItem.bind(this);
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

  render() {
    const { data } = this.state;
    return (
      <AppBlock>
        <AppHeader />
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList posts={data} onDelete={this.deleteItem} />
        <PostAddForm />
      </AppBlock>
    );
  }
}
