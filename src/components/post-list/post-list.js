import React from "react";

import PostListItem from "../post-list-item";
import "./post-list.css";

const PostList = ({
  posts,
  onDelete,
  onToggleImportant,
  onToggleLike,
  onSelectedItem,
}) => {
  const elements = posts.map((item) => {
    // Простой способ проверки на объект + содержится ли в нем информация
    if (typeof item === "object" && isEmpty(item)) {
      const { id, ...itemProps } = item;
      //id нужен для эффективного использования реакт,чтобы рендил именно новый пост(данные)
      return (
        <li key={id} className="list-group-item">
          <PostListItem
            postId={id}
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleLike={() => onToggleLike(id)}
            onSelectedItem={() => onSelectedItem(id)}
          />
        </li>
      );
    }
  });

  function isEmpty(obj) {
    for (let key in obj) {
      return true;
    }
    return false;
  }

  return <ul className="app-list list-group">{elements}</ul>;
};

export default PostList;
