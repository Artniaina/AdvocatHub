import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {  formats } from "./EditorCustomBar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = ({id}) => {
  const [value, setValue] = React.useState("");

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <div className="text-editor">
      <EditorToolbar id={id}/>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules(id)}  
        formats={formats}
      />
    </div>
  );
};
const modules = (id) => ({
    toolbar: {
      container: `#toolbar-${id}`
    }
  });

export default Editor;
