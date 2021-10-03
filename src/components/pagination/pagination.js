import React, { Component } from "react";

import "./pagination.scss";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOfActive: 0,
    };
  }

  countPaginationButtons(data, visiblePostsAmount) {
    let amountOfBtns = 1;
    if (data.length > visiblePostsAmount) {
      amountOfBtns =
        data.length % visiblePostsAmount === 0
          ? Math.floor(data.length / visiblePostsAmount)
          : Math.floor(data.length / visiblePostsAmount) + 1;
    }
    return amountOfBtns;
  }

  createPaginationButtons(data, visiblePostsAmount) {
    const { onChangeVisiblePosts } = this.props;
    const amountOfBtns = this.countPaginationButtons(data, visiblePostsAmount);

    let paginationBtns = [];
    for (let i = 0; i < amountOfBtns; i++) {
      paginationBtns.push(
        <button
          className={
            this.state.indexOfActive === i
              ? "pagination--btn pagination--btn__avtive"
              : "pagination--btn"
          }
          key={i}
          onClick={(e) => {
            this.setState({ indexOfActive: i });
            onChangeVisiblePosts(i, visiblePostsAmount);
          }}
        >
          {i + 1}
        </button>
      );
    }
    return paginationBtns;
  }

  render() {
    const { data } = this.props;
    const paginationBtns = this.createPaginationButtons(
      data,
      this.props.visiblePostsAmount
    );
    return <div className="pagination--block">{paginationBtns}</div>;
  }
}
