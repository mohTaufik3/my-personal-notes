import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate, showFormattedDateEn } from '../utils';
import { useLanguage } from '../context/LanguageContext';
import NoteActionButton from '../components/NoteActionButton';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const { error, data } = await getNote(id);
      if (error) {
        navigate('/');
        return;
      }
      setNote(data);
      setLoading(false);
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    const { error } = await deleteNote(id);
    if (!error) navigate('/');
  };

  const handleArchiveToggle = async () => {
    const fn = note.archived ? unarchiveNote : archiveNote;
    const { error } = await fn(id);
    if (!error) {
      const { data } = await getNote(id);
      setNote(data);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner" />
        <p>{t.loading}</p>
      </div>
    );
  }

  const formattedDate = language === 'id'
    ? showFormattedDate(note.createdAt)
    : showFormattedDateEn(note.createdAt);

  return (
    <main className="detail-page" data-testid="note-detail-page">
      <button className="detail-back" onClick={() => navigate('/')} data-testid="back-button">
        ← {t.backToHome}
      </button>

      <h1 className="detail-title" data-testid="note-detail-title">{note.title}</h1>
      <p className="detail-date" data-testid="note-detail-date">
        {t.createdAt}: {formattedDate}
      </p>
      <p className="detail-body" data-testid="note-detail-body">{note.body}</p>

      <div className="detail-actions">
        <NoteActionButton variant="delete" onClick={handleDelete}>
          {t.deleteBtn}
        </NoteActionButton>
        <NoteActionButton variant="archive" onClick={handleArchiveToggle}>
          {note.archived ? t.unarchiveBtn : t.archiveBtn}
        </NoteActionButton>
      </div>
    </main>
  );
}

export default NoteDetailPage;
