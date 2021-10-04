import React, { Component } from "react";

import PostItemInfo from "../postItemInfo";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import Pagination from "../pagination/pagination";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Going to learn React",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id1",
        },
        {
          label: "That is so good",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id2",
        },
        {
          label: "I need a break...",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id3",
        },
        {
          label: "I want to learn something new!",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id4",
        },
        {
          label: "Which experience do you have?",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id5",
        },
        {
          label: "Tell about your the most difficult project",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id6",
        },
        {
          label: "What is programming for you?",
          body: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Modi exercitationem molestias blanditiis ab corrupti libero nam similique! 
          Quia tempora sunt et impedit voluptatem quos eius, expedita atque excepturi 
          error minima, non mollitia laborum placeat aperiam unde ex hic eveniet
           asperiores dolore. Quasi expedita velit cupiditate impedit sit labore, non mollitia!
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas quia, temporibus deserunt totam amet officiis!`,
          important: false,
          liked: false,
          id: "id7",
        },
      ],

      term: "",
      filter: "all",

      pagination: {
        id: 0,
        visiblePostsAmount: 3,
      },

      dataForPostItem: null,
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLike = this.onToggleLike.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onChangeVisiblePosts = this.onChangeVisiblePosts.bind(this);
    this.onSelectedItem = this.onSelectedItem.bind(this);
  }

  addItem(label, body) {
    const newItem = {
      label: label,
      body: body,
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

  searchPost(items, term) {
    if (term.length === 0) return items;
    return items.filter((item) => {
      return (
        item.label.toLowerCase().indexOf(term) > -1 ||
        item.label.indexOf(term) > -1
      );
    });
  }

  onUpdateSearch(term) {
    this.setState({ term: term });
  }

  filterPosts(items, filter) {
    if (filter === "like") return items.filter((item) => item.liked);
    else if (filter === "important")
      return items.filter((item) => item.important);
    else return items;
  }

  onFilterSelect(filter) {
    this.setState({ filter: filter });
  }

  onChangeVisiblePosts(id, visiblePostsAmount) {
    this.setState({
      pagination: { id: id, visiblePostsAmount: visiblePostsAmount },
    });
  }

  changeVisiblePostsPagination(items) {
    const visiblePosts = [];

    const { id, visiblePostsAmount } = this.state.pagination;

    let i = id * visiblePostsAmount;

    const limit = i + visiblePostsAmount;

    for (; i < limit; i++) {
      if (this.state.data[i]) visiblePosts.push(this.state.data[i]);
    }
    return visiblePosts;
  }

  onSelectedItem(id) {
    const { data } = this.state;
    this.setState(({ dataForPostItem }) => ({
      dataForPostItem: data[data.findIndex((elem) => elem.id === id)],
    }));
  }

  render() {
    const { data, term, filter, dataForPostItem } = this.state;
    const amountOfPosts = data.length;
    const likedPosts = data.filter((elem) => elem.liked).length;

    const visiblePosts = this.filterPosts(
      this.searchPost(this.changeVisiblePostsPagination(data), term),
      filter
    );

    return (
      <Router>
        <div className="app">
          <Route
            path="/"
            render={() => {
              return (
                <>
                  <AppHeader
                    amountOfPosts={amountOfPosts}
                    likedPosts={likedPosts}
                  />
                  <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                      filter={filter}
                      onFilterSelect={this.onFilterSelect}
                    />
                  </div>
                  <div className="post-list-pagination">
                    <PostList
                      posts={visiblePosts}
                      onDelete={this.deleteItem}
                      onToggleImportant={this.onToggleImportant}
                      onToggleLike={this.onToggleLike}
                      onSelectedItem={this.onSelectedItem}
                    />
                    <Pagination
                      data={data}
                      onChangeVisiblePosts={this.onChangeVisiblePosts}
                      visiblePostsAmount={
                        this.state.pagination.visiblePostsAmount
                      }
                    ></Pagination>
                  </div>
                  <PostAddForm onAdd={this.addItem} />
                </>
              );
            }}
            exact
          />
          <Route
            path="/post"
            render={() => {
              return (
                <PostItemInfo
                  onDelete={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleLike={this.onToggleLike}
                  dataForPostItem={dataForPostItem}
                ></PostItemInfo>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}
