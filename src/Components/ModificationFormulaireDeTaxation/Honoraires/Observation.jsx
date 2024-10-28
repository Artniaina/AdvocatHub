import React, { useState, useRef, useEffect } from "react";
import Editor from "../TextEditor/EditeurHTML";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";
import PopupHTMLEditorWarning from "../TextEditor/PopupHTMLEditorWarning"; 
import { useUpdateDataContext } from "../../../Hooks/UpdatedDataContext";

const Observation = () => {
  const { editorContents, setEditorContents } = useUpdateDataContext();
  const [showWarning, setShowWarning] = useState(false);
  const observationRef = useRef(null);
  const [content, setContent] = useState(""); 

  const handleEditorChange = (id, newContent) => {
    setContent(newContent); 
    setEditorContents((prevContent) => ({
      ...prevContent,
      [id]: newContent,
    }));
  };

  const handleClosePopup = () => {
    setShowWarning(false);
  };

  const handleClickOutside = (event) => {
    if (observationRef.current && !observationRef.current.contains(event.target)) {
      const plainText = extractPlainText(content);

      if (plainText.length < 6 && plainText.trim() !== "") {
        setShowWarning(true);
      }
    }
  };

  const extractPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [content]);

  return (
    <div ref={observationRef}> 
      <Editor
        key="observation"
        id="observation"
        onChange={(newContent) => handleEditorChange("observation", newContent)}
      />
      {showWarning && (
        <PopupHTMLEditorWarning 
          onClose={handleClosePopup} 
          nomChamp="observation" 
        />
      )}
    </div>
  );
};

export default Observation;
