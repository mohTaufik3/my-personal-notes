import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

function AppHeader({ user, onLogout, onSearch, searchKeyword }) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="app-header" data-testid="app-header">
      <div className="app-header__brand">
        My<span>Notes</span>
      </div>

      <div className="app-header__search">
        <input type="text" placeholder={t.searchPlaceholder} value={searchKeyword} onChange={(e) => onSearch(e.target.value)} data-testid="search-input" />
      </div>

      <div className="app-header__actions">
        <span className="user-chip" data-testid="user-name">
          {user?.name}
        </span>
        <button className="btn-icon" onClick={toggleLanguage} title="Ubah bahasa">
          {language === 'id' ? 'id' : 'us'}
        </button>
        <button className="btn-icon" onClick={toggleTheme} title={theme === 'dark' ? t.lightMode : t.darkMode}>
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
        <button className="btn-logout" onClick={onLogout} data-testid="logout-button">
          {t.logout}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
