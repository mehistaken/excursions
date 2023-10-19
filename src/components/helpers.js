export function l10n(string, lang) {
  const dict = {
    'Welcome!'                   : { 'en': 'Welcome!', 'fr': 'Bienvenue!' },
    'Where would you like to go?': { 'en': 'Where would you like to go?', 'fr': 'Où voudriez-vous aller?' },
    'Back to destinations'       : { 'en': 'Back to destinations', 'fr': 'Retour aux destinations' },
    'Destinations'               : { 'en': 'Destinations', 'fr': 'Destinations' },
    'Destination'                : { 'en': 'Destination', 'fr': 'Destination' },
    'Loading destinations'       : { 'en': 'Loading destinations', 'fr': 'Chargement des destinations' },
    'Loading excursions'         : { 'en': 'Loading excursions', 'fr': 'Chargement des excursions' },
    'no data'                    : { 'en': '⚠️ no data', 'fr': '⚠️ pas de données' }
  };
  
  if (!dict[string]) console.warn(`Missing translation for "${string}"`);
  return dict[string] ? dict[string][lang] : string;
}