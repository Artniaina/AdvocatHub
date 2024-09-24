import React, { useState } from "react";
import Editor from "../TextEditor/EditeurHTML";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";

const Observation = () => {
  const {editorContentObservation, setEditorContentObservation} = useGeneraliteContext();

  const handleEditorChange = (id, content) => {
    setEditorContentObservation((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
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
