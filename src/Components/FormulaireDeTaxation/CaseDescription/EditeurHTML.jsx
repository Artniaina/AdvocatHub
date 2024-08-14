import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorCustomBar from './EditorCustomBar';

const EditeurHTML = () => {
  const [editorContent, setEditorContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setEditorContent(editorContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const modules = {
    toolbar: {
      container: '#toolbar',  
      handlers: {
       
      }
    },
  };

  return (
    <div>
      <EditorCustomBar
        onEmojiClick={handleEmojiClick}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
      />
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        theme="snow"
        modules={modules}
      />
    </div>
  );
};

export default EditeurHTML;
