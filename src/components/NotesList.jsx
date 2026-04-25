import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword = '', emptyMessage }) {
  const { t } = useLanguage();

  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state" data-testid="notes-empty">
        {emptyMessage || t.emptyNotes}
      </div>
    );
  }

  return (
    <div className="notes-grid" data-testid="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          searchKeyword={searchKeyword}
        />
      ))}
    </div>
  );
}

export default NotesList;
