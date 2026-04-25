import React from 'react';

function NoteSearch({ onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input type="text" placeholder="Cari catatan ..." className="note-search__input" data-testid="note-search-input" onChange={(event) => onSearch(event.target.value)} />
    </div>
  );
}

export default NoteSearch;
