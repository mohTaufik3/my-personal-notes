import React from 'react';
import NoteItem from './NoteItem';

function formatGroupHeader(groupKey) {
  const [year, month] = groupKey.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function groupNotesByMonth(notes) {
  return notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(note);
    return groups;
  }, {});
}

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword = '' }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes.length > 0; // update dengan nilai yang sesuai

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = groupNotesByMonth(notes);

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
          <h3>{formatGroupHeader(groupKey)}</h3>
          <span data-testid={`${groupKey}-group-count`}>{groupNotes.length} catatan</span>
          {groupNotes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} searchKeyword={searchKeyword} />
          ))}
        </section>
      ))}
    </div>
  );
}

export default NotesList;
