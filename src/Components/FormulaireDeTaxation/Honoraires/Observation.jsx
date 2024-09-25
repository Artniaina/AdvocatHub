import React, { useState } from "react";
import Editor from "../TextEditor/EditeurHTML";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";

const Observation = () => {
  const { editorContents, setEditorContents } = useGeneraliteContext();

  const handleEditorChange = (id, content) => {
    setEditorContents((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };

  return (
    <>
      <Editor
        key="observation"
        id="observation"
        onChange={(content) => handleEditorChange("observation", content)}
      />
    </>
  );
};

export default Observation;
