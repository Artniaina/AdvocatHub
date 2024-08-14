import React from 'react';
import EmojiPicker from 'emoji-picker-react';

const EditorCustomBar = ({ onEmojiClick, showEmojiPicker, setShowEmojiPicker }) => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>
    <select className="ql-size">
      <option value="small">Small</option>
      <option value="medium" selected>Medium</option>
      <option value="large">Large</option>
      <option value="huge">Huge</option>
    </select>
    <button className="ql-bold">Bold</button>
    <button className="ql-italic">Italic</button>
    <button className="ql-underline">Underline</button>
    <button className="ql-link">Link</button>
    <button className="ql-image">Image</button>
    <button
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    >
      😀
    </button>
    {showEmojiPicker && (
      <EmojiPicker onEmojiClick={onEmojiClick} />
    )}
  </div>
);

export default EditorCustomBar;
