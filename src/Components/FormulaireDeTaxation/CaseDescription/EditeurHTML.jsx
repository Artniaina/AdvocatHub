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

  const handleEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setEditorContent((prevContent) => prevContent + emojiObject.emoji);
      setShowEmojiPicker(false);
    } else {
      console.error('Emoji object or emoji property is undefined');
    }
  };
  

  const modules = {
    toolbar: {
      container: '#toolbar',
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
