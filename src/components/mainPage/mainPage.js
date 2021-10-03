import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import Pagination from "../pagination/pagination";

export default class MainPage extends Component {
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
        {
          label: "I want to learn something new!",
          important: false,
          liked: false,
          id: "id4",
        },
        {
          label: "Which experience do you have?",
          important: false,
          liked: false,
          id: "id5",
        },
        {
          label: "Tell about your the most difficult project",
          important: false,
          liked: false,
          id: "id6",
        },
        {
          label: "What is programming for you?",
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
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLike = this.onToggleLike.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onChangeVisiblePosts = this.onChangeVisiblePosts.bind(this);
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

  render() {
    const { data, term, filter } = this.state;
    const amountOfPosts = data.length;
    const likedPosts = data.filter((elem) => elem.liked).length;

    const visiblePosts = this.filterPosts(
      this.searchPost(this.changeVisiblePostsPagination(data), term),
      filter
    );

    return (
      <>
        <AppHeader amountOfPosts={amountOfPosts} likedPosts={likedPosts} />
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
          />
          <Pagination
            data={data}
            onChangeVisiblePosts={this.onChangeVisiblePosts}
            visiblePostsAmount={this.state.pagination.visiblePostsAmount}
          ></Pagination>
        </div>
        <PostAddForm onAdd={this.addItem} />
      </>
    );
  }
}
