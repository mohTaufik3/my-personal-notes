import React, { useState, useEffect } from 'react';
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote, addNote } from '../utils/network-data';
import { useLanguage } from '../context/LanguageContext';
import NotesList from '../components/NotesList';
import NoteInput from '../components/NoteInput';

function HomePage({ searchKeyword = '' }) {
  const { t } = useLanguage();
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const [activeResult, archivedResult] = await Promise.all([getActiveNotes(), getArchivedNotes()]);
    if (!activeResult.error) setActiveNotes(activeResult.data);
    if (!archivedResult.error) setArchivedNotes(archivedResult.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async ({ title, body }) => {
    const { error } = await addNote({ title, body });
    if (!error) await fetchNotes();
  };

  const handleDelete = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) await fetchNotes();
  };

  const handleArchive = async (id) => {
    const isActive = activeNotes.some((n) => n.id === id);
    const { error } = isActive ? await archiveNote(id) : await unarchiveNote(id);
    if (!error) await fetchNotes();
  };

  const filteredActive = activeNotes.filter((n) => n.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  const filteredArchived = archivedNotes.filter((n) => n.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner" />
        <p>{t.loading}</p>
      </div>
    );
  }

  return (
    <main className="app-main" data-testid="home-page">
      <section className="notes-section" data-testid="active-notes-section" aria-labelledby="active-title">
        <div className="notes-section__header">
          <h2 className="notes-section__title" id="active-title">
            {t.activeNotes}
          </h2>
          <span className="notes-section__count">{filteredActive.length}</span>
        </div>
        <NotesList notes={filteredActive} onDelete={handleDelete} onArchive={handleArchive} searchKeyword={searchKeyword} emptyMessage={t.emptyNotes} />
      </section>

      <section className="notes-section" data-testid="archived-notes-section" aria-labelledby="archived-title">
        <div className="notes-section__header">
          <h2 className="notes-section__title" id="archived-title">
            {t.archivedNotes}
          </h2>
          <span className="notes-section__count">{filteredArchived.length}</span>
        </div>
        <NotesList notes={filteredArchived} onDelete={handleDelete} onArchive={handleArchive} searchKeyword={searchKeyword} emptyMessage={t.emptyArchived} />
      </section>

      <button className="fab" onClick={() => setShowInput(true)} title={t.addNote} data-testid="fab-add-note">
        +
      </button>

      {showInput && <NoteInput onAdd={handleAddNote} onClose={() => setShowInput(false)} />}
    </main>
  );
}

export default HomePage;
