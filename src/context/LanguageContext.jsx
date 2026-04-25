import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    appTitle: 'Catatan Pribadi',
    activeNotes: 'Catatan Aktif',
    archivedNotes: 'Arsip',
    addNote: 'Buat Catatan',
    titlePlaceholder: 'Judul ...',
    bodyPlaceholder: 'Tuliskan catatanmu di sini ...',
    searchPlaceholder: 'Cari catatan ...',
    createBtn: 'Simpan',
    deleteBtn: 'Hapus',
    archiveBtn: 'Arsipkan',
    unarchiveBtn: 'Aktifkan',
    emptyNotes: 'Tidak ada catatan',
    emptyArchived: 'Tidak ada arsip',
    remainingChars: 'Sisa karakter',
    bodyError: 'Isi catatan minimal 10 karakter',
    logout: 'Keluar',
    login: 'Masuk',
    register: 'Daftar',
    email: 'Email',
    password: 'Kata Sandi',
    name: 'Nama',
    confirmPassword: 'Konfirmasi Kata Sandi',
    loginTitle: 'Selamat Datang',
    loginSubtitle: 'Masuk untuk melanjutkan',
    registerTitle: 'Buat Akun',
    registerSubtitle: 'Daftar untuk mulai mencatat',
    noAccount: 'Belum punya akun?',
    haveAccount: 'Sudah punya akun?',
    loading: 'Memuat ...',
    noteDetail: 'Detail Catatan',
    backToHome: 'Kembali',
    createdAt: 'Dibuat pada',
    passwordMismatch: 'Kata sandi tidak cocok',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang',
  },
  en: {
    appTitle: 'Personal Notes',
    activeNotes: 'Active Notes',
    archivedNotes: 'Archived',
    addNote: 'New Note',
    titlePlaceholder: 'Title ...',
    bodyPlaceholder: 'Write your note here ...',
    searchPlaceholder: 'Search notes ...',
    createBtn: 'Save',
    deleteBtn: 'Delete',
    archiveBtn: 'Archive',
    unarchiveBtn: 'Unarchive',
    emptyNotes: 'No notes yet',
    emptyArchived: 'No archived notes',
    remainingChars: 'Characters remaining',
    bodyError: 'Note body must be at least 10 characters',
    logout: 'Sign Out',
    login: 'Sign In',
    register: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to continue',
    registerTitle: 'Create Account',
    registerSubtitle: 'Sign up to start noting',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    loading: 'Loading ...',
    noteDetail: 'Note Detail',
    backToHome: 'Back',
    createdAt: 'Created on',
    passwordMismatch: 'Passwords do not match',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = translations[language];

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  return useContext(LanguageContext);
}

export { LanguageProvider, useLanguage };
