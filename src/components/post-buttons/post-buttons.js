import React from "react";

import "./post-buttons.css";

const PostButtons = ({
  onDelete,
  onToggleLike,
  onToggleImportant,
  onDeletedPost,
}) => {
  return (
    <div className="buttons-container">
      <button
        type="button"
        className="btn-star btn-sm"
        onClick={onToggleImportant}
      >
        <i className="fa fa-star"></i>
      </button>
      <button
        type="button"
        className="btn-trash btn-sm"
        onClick={() => {
          onDelete();
          if (onDeletedPost) onDeletedPost();
        }}
      >
        <i className="fa fa-trash-o"></i>
      </button>
      <i className="fa fa-heart" onClick={onToggleLike}></i>
    </div>
  );
};

export default PostButtons;
