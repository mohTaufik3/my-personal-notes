import React from 'react';

function NoteActionButton({ variant, onClick, children }) {
  return (
    <button
      className={`btn-action btn-action--${variant}`}
      type="button"
      onClick={onClick}
      data-testid={`note-item-${variant}-button`}
    >
      {children}
    </button>
  );
}

export default NoteActionButton;
