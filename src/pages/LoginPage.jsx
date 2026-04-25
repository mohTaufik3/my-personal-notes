import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import useInput from '../hooks/useInput';

function LoginPage({ onLoginSuccess }) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error, data } = await login({ email, password });
    if (!error) {
      putAccessToken(data.accessToken);
      onLoginSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{ position: 'relative' }}>
      <div className="auth-theme-row" style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-icon" onClick={toggleLanguage} title="Ubah bahasa">
          {language === 'id' ? 'id' : 'us'}
        </button>
        <button className="btn-icon" onClick={toggleTheme} title={t.darkMode}>
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </div>

      <div className="auth-card">
        <div className="auth-card__logo">
          My<span>Notes</span>
        </div>
        <p className="auth-card__subtitle">{t.loginSubtitle}</p>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-field">
            <label htmlFor="email">{t.email}</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} placeholder="nama@email.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="password">{t.password}</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} placeholder="••••••••" required minLength={6} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t.loading : t.login}
          </button>
        </form>

        <p className="auth-switch">
          {t.noAccount} <Link to="/register">{t.register}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
