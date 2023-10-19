import { Link, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '../context';
import { l10n } from './helpers';

const Excursions = () => {
  const { language } = useContext(LanguageContext);
  const { country, destination } = useParams();
  const [ excursions, setExcursions ] = useState([]);
  const [ error, setError ] = useState('');
  const [ excursionNameList, setExcursionNameList ] = useState([]);
  const dialog = useRef(null);
  const [ lastFocus, setLastFocus ] = useState(null);

  const closeDialog = () => {
    dialog.current.classList.remove('open');
    document.getElementsByTagName('body')[0].classList.remove('popup-open');
    lastFocus.focus();
  };

  const fetchExcursions = () => {
    let dest = destination === 'St. Maarten' ? 'St Maarten' : destination;
    fetch(`https://hotelinfoservice.sunwingtravelgroup.com/swg/${language}/excursionsCountryDestination/${country}/${dest}`)
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error(l10n('no data', language));
      }).then(data => {
        setExcursions(data);
      }).catch((err) => {
        setError(err);
      }
      );
  };

  useEffect(() => {
    fetchExcursions();
  }, []);

  useEffect(() => {
    fetchExcursions();
  }, [country, destination]);

  
  useEffect(() => {
    let list = [];
    excursions.forEach(cat => {
      cat.subCategories.forEach(subcat => {
        subcat.excursions.forEach(excur => {
          list.push(excur.excursionFullName.trim());
        });
      });
    });
    setExcursionNameList(list);
  }, [excursions]);

  const updateFilter = (value) => {
    const tiles = document.getElementsByClassName('tile');
    let re = new RegExp(value, 'i');
    for(const tile of tiles) {
      if (tile.dataset.excursionfullname.match(re) === null) {
        tile.classList.add('dim');
      } else {
        tile.classList.remove('dim');
      }
    }
  };

  return (
    <>
      <Link to='/destinations' className='back'>&lt; { l10n('Back to destinations', language) }</Link>
      <h1>{ l10n('Destination', language) }: {country}, {destination}</h1>
      {error && 
        <p className='error'>{error.message}</p>
      }
      {!error && excursions.length === 0 ? 
        <p>{ l10n('Loading excursions', language) }...</p>
        :
        <>
          <Filter list={excursionNameList} updateFilter={updateFilter}></Filter>
          {excursions.map((cat, idx) =>
            <ExcursionCategory key={idx} item={cat} setLastFocus={setLastFocus}></ExcursionCategory>
          )}
        </>
      }
      <dialog id="popup" ref={dialog}>
        <div id="popup-content"></div>
        <button onClick={() => closeDialog()}>Close</button>
      </dialog>
    </>
  );
};

export default Excursions;

const ExcursionCategory = (props) => {
  const item = props.item;

  return (
    <div className='category'>
      <h2>{item.categoryName}</h2>
      <div className='subcategory'>
        {item.subCategories.map((subcat, idx) =>
          <div key={idx}>
            <h3>{subcat.subCategoryName}</h3>
            <div className='tile-container'>
              {subcat.excursions.map(exc => 
                <ExucrsionTile key={exc.excursionCode} item={exc} setLastFocus={props.setLastFocus} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ExucrsionTile = (props) => {
  const item = props.item;
  const thumbnail = (item.excursionImages.ImgThumbnails ?? item.excursionImages.Img4x3) ?? item.excursionImages.Img16x9;

  const open = (item) => {
    const body = document.getElementsByTagName('body')[0];
    const dialog = document.getElementById('popup');
    const dialogContent = document.getElementById('popup-content');
    let largeImage = item.excursionImages.Img16x9 ?? item.excursionImages.Img4x3;
    dialogContent.innerHTML = `
      <img src="${largeImage}" alt="${item.excursionName}" />
      <h2>${item.excursionName}</h2>
      <p>${item.excursionShortDescription.replace(/\n/g,'<br/>')}</p>
    `;
    props.setLastFocus(document.activeElement);
    dialog.classList.add('open');
    dialog.focus();
    body.classList.add('popup-open');
  };

  return (
    <div
      className='tile'
      data-excursioncode={item.excursionCode}
      data-excursionfullname={item.excursionFullName.trim()}
    >
      { thumbnail ? <img src={thumbnail[0]} alt={item.excursionName} /> : '' }
      <div className="tile-desc">
        <h4>{item.excursionName}</h4>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); open(item); }}></a>
    </div>
  );
};

const Filter = (props) => {
  const list = props.list;

  return (
    <div className='filter'>
      <input type='search' id='filter' list="excursions" placeholder='Filter excursions' onKeyUp={(e) => props.updateFilter(e.target.value)} />
      <datalist id="excursions">
        {list.map((item, idx) => 
          <option key={idx} value={item} />
        )}
      </datalist>
    </div>
  );
};