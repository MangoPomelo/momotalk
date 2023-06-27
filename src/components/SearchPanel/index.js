import React, { useCallback, useState, useRef, useMemo } from 'react';
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
  const stringify = useStringify();

  const submitButtonRef = useRef(null);

  const [keyword, setKeyword] = useState('');

  const maskArray = useMemo(() => (characters
      .map(stringify)
      .map((str) => str.toLowerCase())
      .map((x) => x.includes(keyword.toLowerCase()))
  ), [characters, keyword, stringify]);

  const onInputTextChange = useCallback((evt) => {
    setKeyword(evt.target.value);
  }, []);

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    onSubmit(evt, maskArray);
  }, [maskArray]);

  const onClear = useCallback((evt) => {
    setKeyword('');
  }, []);

  useUpdateEffect(() => {
    submitButtonRef.current.click();
  }, [JSON.stringify(maskArray)]);

  return (
    <form className="search-panel" onSubmit={onFormSubmit}>
      <input className="search-panel__input" type="text" id="searchPanel" name="message" value={keyword} onChange={onInputTextChange} />
      <button className="search-panel__clear" type="button" onClick={onClear} >clear</button>
      <input className="search-panel__submit" type="submit" value="submit" ref={submitButtonRef} />
    </form>
  );
}

/**
 * Stringify a character
 * @function stringify
 * @param {CharacterData} character Character who should be stringified
 * @return {string} Stringified character
 */

/**
 * Stringify character data
 * @return {stringify} Stringified character
 */
function useStringify() {
  const { t } = useTranslation();

  const stringify = useCallback((character) => {
    const translatedName = t(character.name, { ns: 'students' });
    const translatedClub = t(character.club, { ns: 'localization' });
    return translatedName + translatedClub;
  }, [t]);

  return stringify;
}
