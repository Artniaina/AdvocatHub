import React, { useState } from "react";
import Editor from "../TextEditor/EditeurHTML";

const Observation = () => {
  const [editorContent, setEditorContent] = useState({});

  const handleEditorChange = (id, content) => {
    setEditorContent((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };

  const handleSubmit = () => {
    console.log(editorContent);
  };
  return (
    <>
      <Editor
        key="editor1"
        id="editor1"
        onChange={(content) => handleEditorChange("editor1", content)}
      />
    </>
  );
};

export default Observation;
