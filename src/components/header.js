import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { l10n } from './helpers';
import logo from '../assets/NewSunwingLogo-white.png';

function Header() {
  const { language } = useContext(LanguageContext);

  return (
    <header>
      <div className='container'>
        <a href="/"><img className='logo' src={logo} alt='Sunwing logo' /></a>
        <nav>
          <ul>
            <li><a href="/destinations">{ l10n('Destinations', language) }</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;