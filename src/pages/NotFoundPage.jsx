import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <main className="app-main">
      <div className="not-found">
        <h2>404</h2>
        <p>Halaman tidak ditemukan.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '8px' }}>
          {t.backToHome}
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
