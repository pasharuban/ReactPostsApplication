import React, { Component } from "react";
import PostButtons from "../post-buttons";
import BackButton from "../back-button";
import "./postItemInfo.scss";

export default class PostItemInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postItem: {
        label: "Label of Post",
        body: "Body of Post",
        important: false,
        liked: false,
        id: "id0",
      },
      deleted: false,
    };
    this.changeLikedState = this.changeLikedState.bind(this);
    this.changeImportantState = this.changeImportantState.bind(this);
    this.onDeletedPost = this.onDeletedPost.bind(this);
  }

  changeLikedState() {
    this.setState(({ postItem }) => {
      const { label, body, liked, important, id } = this.state.postItem;
      const newItem = {
        label,
        body,
        liked: !liked,
        important,
        id,
      };

      return { postItem: newItem };
    });

    console.log(this.state.postItem);
  }

  changeImportantState() {
    this.setState(({ postItem }) => {
      const { label, body, liked, important, id } = this.state.postItem;
      const newItem = {
        label,
        body,
        liked,
        important: !important,
        id,
      };

      return { postItem: newItem };
    });

    console.log(this.state.postItem);
  }

  componentDidMount() {
    this.setState(({ postItem }) => {
      const { label, body, liked, important, id } = this.props.dataForPostItem;
      const newItem = {
        label,
        body,
        liked,
        important,
        id,
      };

      return { postItem: newItem };
    });
  }

  onDeletedPost() {
    this.setState(({ deleted }) => ({ deleted: true }));
  }

  render() {
    const { label, body, important, liked, id } = this.state.postItem;

    const { onDelete, onToggleImportant, onToggleLike } = this.props;

    let classNamesForButtonsSection = "post-block-buttons";

    if (important) classNamesForButtonsSection += " important";
    if (liked) classNamesForButtonsSection += " like";

    if (this.state.deleted) return <DeletedPageMessage />;
    return (
      <>
        <BackButton></BackButton>
        <div className="postBlock">
          <h1 className="title-of-post">{label}</h1>

          <p className="body-of-post">{body}</p>
          <div className={classNamesForButtonsSection}>
            <PostButtons
              onDeletedPost={this.onDeletedPost}
              onDelete={() => onDelete(id)}
              onToggleImportant={() => {
                this.changeImportantState();
                return onToggleImportant(id);
              }}
              onToggleLike={() => {
                this.changeLikedState();
                return onToggleLike(id);
              }}
            ></PostButtons>
          </div>
        </div>
      </>
    );
  }
}

const DeletedPageMessage = () => {
  return (
    <>
      <BackButton></BackButton>
      <div className="postBlock">
        <h2>This page deleted successfully!</h2>
      </div>
    </>
  );
};
