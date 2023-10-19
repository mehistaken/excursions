import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import { l10n } from './components/helpers';
import Header from './components/header';
import Destinations from './components/destinations';
import Excursions from './components/excursions';
import { LanguageContext, DestinationContext } from './context';

const App = () => {
  const [ language, setLanguage ] = useState('en');
  const [ destinations, setDestinations ] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!!window.localStorage && window.localStorage.getItem('sunwinglang') !== null) {
      setLanguage(window.localStorage.getItem('sunwinglang'));
    }
  }, []);

  const setLangAndGo = (lang) => {
    setLanguage(lang);
    window.localStorage.setItem('sunwinglang', lang);
    nav('/destinations');
  };

  return (
    <div className="App">
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <DestinationContext.Provider value={{ destinations, setDestinations }}>
          <Header />
          <div id='main' role='main'>
            <div className='container'>
              <Routes>
                <Route path='/' element={
                  <div style={{'text-align':'center'}}>
                    <h1>{ l10n('Welcome!', language) }</h1>
                    <p>Please select your language:</p>
                    <div className='lang-select'>
                      <button onClick={() => setLangAndGo('en')}>English</button>&nbsp;
                      <button onClick={() => setLangAndGo('fr')}>Français</button>
                    </div>
                  </div>
                } />
                <Route path='/destinations' element={<Destinations />} />
                <Route
                  path='/destinations/:country/:destination'
                  element={<Excursions />}
                />
              </Routes>
            </div>
          </div>
        </DestinationContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
};

export default App;