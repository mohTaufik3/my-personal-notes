import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import { useLanguage } from '../context/LanguageContext';
import AppHeader from './AppHeader';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import NoteDetailPage from '../pages/NoteDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  const { t } = useLanguage();
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const init = async () => {
      const { error, data } = await getUserLogged();
      if (!error) setAuthedUser(data);
      setInitializing(false);
    };
    init();
  }, []);

  const onLoginSuccess = async () => {
    const { error, data } = await getUserLogged();
    if (!error) setAuthedUser(data);
  };

  const onLogout = () => {
    putAccessToken('');
    setAuthedUser(null);
  };

  if (initializing) {
    return (
      <div className="loading-overlay" style={{ minHeight: '100vh' }}>
        <div className="loading-spinner" />
        <p>{t.loading}</p>
      </div>
    );
  }

  if (!authedUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout" data-testid="note-app">
      <AppHeader user={authedUser} onLogout={onLogout} onSearch={setSearchKeyword} searchKeyword={searchKeyword} />
      <Routes>
        <Route path="/" element={<HomePage searchKeyword={searchKeyword} />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
