import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useInput from '../hooks/useInput';

const TITLE_LIMIT = 50;

function NoteInput({ onAdd, onClose }) {
  const { t } = useLanguage();
  const [title, onTitleChange, setTitle] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const remainingChars = TITLE_LIMIT - title.length;
  const isBodyValid = body.trim().length >= 10;

  const handleTitleChange = (e) => {
    if (e.target.value.length <= TITLE_LIMIT) {
      onTitleChange(e);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isBodyValid) return;
    setLoading(true);
    await onAdd({ title, body });
    setTitle('');
    setBody('');
    setSubmitted(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="note-input-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="note-input-panel" data-testid="note-input">
        <div className="note-input-panel__header">
          <h2 className="note-input-panel__title">{t.addNote}</h2>
          <button className="btn-close" onClick={onClose} type="button">×</button>
        </div>
        <form className="note-input-form" onSubmit={onSubmitHandler} data-testid="note-input-form">
          <div>
            <p className={`char-limit ${remainingChars <= 10 ? 'char-limit--warn' : ''}`} data-testid="note-input-title-remaining">
              {t.remainingChars}: {remainingChars}
            </p>
            <input
              type="text"
              placeholder={t.titlePlaceholder}
              value={title}
              onChange={handleTitleChange}
              required
              data-testid="note-input-title-field"
            />
          </div>
          <textarea
            className="note-input-textarea"
            placeholder={t.bodyPlaceholder}
            value={body}
            onChange={onBodyChange}
            required
            data-testid="note-input-body-field"
          />
          {submitted && !isBodyValid && (
            <p className="input-error">{t.bodyError}</p>
          )}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            data-testid="note-input-submit-button"
          >
            {loading ? t.loading : t.createBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteInput;
