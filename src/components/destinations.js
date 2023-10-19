import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { LanguageContext, DestinationContext } from '../context';
import { l10n } from './helpers';

const Destinations = () => {
  const { destinations, setDestinations } = useContext(DestinationContext);
  const { language } = useContext(LanguageContext);
  
  
  // useEffect(() => {
  // }, []);
  if (destinations.length === 0) {
    fetchDestinations(language)
      .then(data =>
        setDestinations(data)
      );
  }

  useEffect(() => {
    fetchDestinations(language)
      .then(data =>
        setDestinations(data)
      );
  }, [language]);

  return (
    <div>
      <h1>{ l10n('Destinations', language) }</h1>
      <p>{ l10n('Where would you like to go?', language) }</p>
      {destinations.length === 0 ? 
        <p>{ l10n('Loading destinations', language) }...</p>
        : 
        <div className='cols cols-4'>
          {destinations.map(item => 
            <Country key={item.countryName} item={item} />
          )}
        </div>
      }
    </div>
  );
};

export default Destinations;

function Country(props) {
  const item = props.item;
  return (
    <div className='countryBlock'>
      <h2>{item.countryName}</h2>
      <ul>
        {item.destinations.map(dest =>
          <li key={dest}><Link to={`${item.countryName}/${dest}`}>{dest}</Link></li>
        )}
      </ul>
    </div>
  );
}

async function fetchDestinations(language) {
  const res = await fetch(`https://hotelinfoservice.sunwingtravelgroup.com/${language}/AllHotelDestinationList`);
  const data = await res.json();
  return data;
}