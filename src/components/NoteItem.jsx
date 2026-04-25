import React from 'react';
import { useNavigate } from 'react-router-dom';
import { showFormattedDate, showFormattedDateEn } from '../utils';
import { useLanguage } from '../context/LanguageContext';
import NoteActionButton from './NoteActionButton';

function highlightText(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase()
      ? <mark key={index}>{part}</mark>
      : part
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const formattedDate = language === 'id'
    ? showFormattedDate(note.createdAt)
    : showFormattedDateEn(note.createdAt);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/notes/${note.id}`);
  };

  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note.id}
      onClick={handleCardClick}
    >
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {formattedDate}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__actions" data-testid="note-item-action">
        <NoteActionButton variant="delete" onClick={() => onDelete(note.id)}>
          {t.deleteBtn}
        </NoteActionButton>
        <NoteActionButton variant="archive" onClick={() => onArchive(note.id)}>
          {note.archived ? t.unarchiveBtn : t.archiveBtn}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;
