import React, { useState, useEffect } from 'react';
import Tetris from './components/Tetris';
import { TR, EN } from './lang/types';
import './App.css'

const App = () => {
  const [lang, setLang] = useState(EN);

  const setLangStorage = (param) => {
    sessionStorage.setItem('lang', param);
    setLang(param);
  }
  const getLangStorage = () => {
    const lang = sessionStorage.getItem('lang');
    if (lang === TR) {
      setLang(TR);
    }
    else {
      setLang(EN);
    }
  }
  useEffect(() => {
    getLangStorage();
  });

  return (
    <div className="App">
      <Tetris setLangStorage={setLangStorage} lang={lang} />
    </div>
  );
}

export default App;