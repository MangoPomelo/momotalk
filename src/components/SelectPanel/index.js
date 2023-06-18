import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CharacterItem } from '../CharacterItem';
import { CharacterList } from '../CharacterList';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

SelectPanel.propTypes = {
  /**
   * Characters who are selectable
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

SelectPanel.defaultProps = {
  characters: [],
  onSubmit: () => {},
};

/**
 * Callback to be called when the form is submitted
 * @callback onSubmit
 * @param {Event} event Event sent when the form is submitted
 * @param {string} selectedCharacters Selected characters sent by the form
 */

/**
 * SelectPanel component <br/>
 * @param {{
 *  characters: CharacterData[],
 *  onSubmit: onSubmit
 * }} props Properties <br/>
 * @return {JSX.Element} SelectPanel component <br/>
 */
export function SelectPanel({ characters, onSubmit }) {
  const [checkedCharacters, setCheckedCharacters] = useState([]);

  const submitButtonRef = useRef(null);

  const onChange = useCallback((event) => {
    const deserializedCharacter = JSON.parse(event.target.value);

    const index = checkedCharacters.findIndex((c) => c.id === deserializedCharacter.id);

    // Filter it out when it exists else add it as new
    if (index >= 0) {
      const filtered = checkedCharacters.filter((c, idx) => idx !== index);
      setCheckedCharacters(filtered);
    } else {
      setCheckedCharacters([...checkedCharacters, deserializedCharacter]);
    }
  }, [checkedCharacters]);

  const onFormSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(event, checkedCharacters);
  }, [checkedCharacters]);

  useUpdateEffect(() => {
    // Skip first time render otherwise it will submit and trigger other observers render
    submitButtonRef.current.click();
  }, [checkedCharacters]);

  return (
    <form className="select-panel" onSubmit={onFormSubmit}>
      <CharacterList>
        {characters.map((c, idx) => <WrappedCharacter key={c.id} character={c} checked={checkedCharacters.some((checked) => checked.id === c.id)} onChange={onChange} />)}
      </CharacterList>
      <input className="select-panel__submit" type="submit" value="submit" ref={submitButtonRef} />
    </form>
  );
}

WrappedCharacter.propTypes = {
  /**
   * The character
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  }).isRequired,

  /**
   * Whether the character is selected or not
   */
  checked: PropTypes.bool,

  /**
   * Callback function to be called when the input checkbox is changed
   */
  onChange: PropTypes.func,
};

WrappedCharacter.defaultProps = {
  checked: false,
  onChange: () => {},
};

/**
 * Callback to be called when the input checkbox button is changed
 * @callback onChange
 * @param {Event} event Event sent when the form is submitted
 */

/**
 * Candidate component <br/>
 * @param {{
*  character: CharacterData,
*  checked: boolean,
*  onChange: onChange,
* }} props Properties <br/>
* @return {JSX.Element} Candidate component <br/>
*/
function WrappedCharacter({ character, checked, onChange }) {
  const serializedCharacter = JSON.stringify(character);
  const inputId = `selectPanelWrappedCharacter${character.id}`;

  return (
    <label className="wrapped-character__character" htmlFor={inputId}>
      <input className="wrapped-character__checkbox" type="checkbox" id={inputId} value={serializedCharacter} checked={checked} name={character.name} onChange={onChange} />
      <CharacterItem character={character} />
    </label>
  );
}
