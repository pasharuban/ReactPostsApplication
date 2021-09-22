import React from "react";
import PostButtons from "../post-buttons";

import "./post-list-item.css";

const PostListItem = ({
  label,
  onDelete,
  onToggleImportant,
  onToggleLike,
  important,
  liked,
}) => {
  let classNames = "app-list-item d-flex justify-content-between";

  if (important) {
    classNames += " important";
  }
  if (liked) {
    classNames += " like";
  }

  return (
    <div className={classNames}>
      <span className="app-list-item-label">{label}</span>
      <div className="d-flex justify-content-center align-items-center">
        <PostButtons
          onDelete={onDelete}
          onToggleImportant={onToggleImportant}
          onToggleLike={onToggleLike}
        />
      </div>
    </div>
  );
};

export default PostListItem;
