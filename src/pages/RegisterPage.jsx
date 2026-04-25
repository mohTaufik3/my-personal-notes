import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import useInput from '../hooks/useInput';

function RegisterPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(t.passwordMismatch);
      return;
    }
    setPasswordError('');
    setLoading(true);
    const { error } = await register({ name, email, password });
    if (!error) {
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{ position: 'relative' }}>
      <div className="auth-theme-row" style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-icon" onClick={toggleLanguage}>
          {language === 'id' ? 'id' : 'us'}
        </button>
        <button className="btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </div>

      <div className="auth-card">
        <div className="auth-card__logo">
          My<span>Notes</span>
        </div>
        <p className="auth-card__subtitle">{t.registerSubtitle}</p>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-field">
            <label htmlFor="name">{t.name}</label>
            <input type="text" id="name" value={name} onChange={onNameChange} placeholder="Nama lengkap" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">{t.email}</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} placeholder="nama@email.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="password">{t.password}</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} placeholder="Min. 6 karakter" required minLength={6} />
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="Ulangi password" required />
            {passwordError && <span className="form-error">{passwordError}</span>}
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t.loading : t.register}
          </button>
        </form>

        <p className="auth-switch">
          {t.haveAccount} <Link to="/login">{t.login}</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
