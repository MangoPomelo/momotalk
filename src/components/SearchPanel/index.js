import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import './index.css';

SearchPanel.propTypes = {
  /**
   * The characters
   */
  characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  })),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

SearchPanel.defaultProps = {
  candidates: [],
  onSubmit: () => {},
};

/**
 * Callback to be called when the form is submitted
 * @callback onSubmit
 * @param {Event} event Event sent when the form is submitted
 * @param {boolean[]} maskArray Mask array sent by the form
 */

/**
 * SearchPanel component <br/>
 * @param {{
*  candidates: CharacterData[],
*  onSubmit: onSubmit,
* }} props Properties <br/>
* @return {JSX.Element} SearchPanel component <br/>
*/
export function SearchPanel({ characters, onSubmit }) {
  const { t } = useTranslation();

  const submitButtonRef = useRef(null);

  const [keyword, setKeyword] = useState('');

  const onInputTextChange = useCallback((evt) => {
    setKeyword(evt.target.value);
  }, []);

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();

    const compressedInfoList = characters
        .map((c) => {
          const translatedName = t(c.name, { ns: 'students' });
          const translatedClub = t(c.club, { ns: 'localization' });
          return translatedName + translatedClub;
        })
        .map((str) => str.toLowerCase());
    const maskArray = compressedInfoList.map((x) => x.includes(keyword.toLowerCase()));

    onSubmit(evt, maskArray);
  }, [characters, keyword, t]);

  const onClear = useCallback((evt) => {
    setKeyword('');
  }, []);

  useUpdateEffect(() => {
    submitButtonRef.current.click();
  }, [keyword, t]);

  return (
    <form className="search-panel" onSubmit={onFormSubmit}>
      <input className="search-panel__input" placeholder="Search" type="text" id="searchPanel" name="message" value={keyword} onChange={onInputTextChange} />
      <button className="search-panel__clear" onClick={onClear} >clear</button>
      <input className="search-panel__submit" type="submit" value="submit" ref={submitButtonRef} />
    </form>
  );
}
