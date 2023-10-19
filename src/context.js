import { createContext } from 'react';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {}
});

export const DestinationContext = createContext({
  destinations: [],
  setDestinations: () => {}
});