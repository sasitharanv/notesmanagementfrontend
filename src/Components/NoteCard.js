import React from "react";
import './NoteCard.css';

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
        <div className="note-header">
            <h3>{note.title}</h3>
        </div>
        <div className="note-content">
            <p>{note.content}</p>
        </div>
        <div className="note-footer">
            <span>Created: {note.createdDate}</span>
            <span>Last Edited: {note.lastEditedDate || 'N/A'}</span>
        </div>
    </div>
  );
};

export default NoteCard;
