import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./TagComponent.css";

const COUNTRIES = ["work", "complete"];

const suggestions = COUNTRIES.map((text) => {
  return {
    id: text,
    text: text,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tag = (props) => {
  const [tags, setTags] = React.useState(
    props.tagsInput ? props.tagsInput : []
  );
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    const UpdatedTags = tags;
    props.set(UpdatedTags);
  };

  useEffect(() => {
    props.set(tags);
  }, [tags, props.set]);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    const UpdatedTags = tags;
    props.set(UpdatedTags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    const UpdatedTags = tags;
    props.set(UpdatedTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="app">
      <div style={{ marginTop: "10px" }}>
        <ReactTags
          //inline
          inputFieldPosition="top"
          maxLength="42"
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          //   inputFieldPosition="bottom"
          autocomplete
        />
      </div>
    </div>
  );
};

export default Tag;
