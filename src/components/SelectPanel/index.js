import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CharacterItem } from '../CharacterItem';
import { CharacterList } from '../CharacterList';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { CharacterData } from '../../classes/characterData';

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
  const [selectedCharacter, setSelectedCharacter] = useState(new CharacterData());

  const submitButtonRef = useRef(null);

  const onChange = useCallback((event) => {
    const deserializedCharacter = JSON.parse(event.target.value);

    setSelectedCharacter(deserializedCharacter);
  }, [setSelectedCharacter]);

  const onFormSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(event, selectedCharacter);
  }, [selectedCharacter, onSubmit]);

  useUpdateEffect(() => {
    // Skip first time render otherwise it will submit and trigger other observers render
    submitButtonRef.current.click();
  }, [JSON.stringify(selectedCharacter)]);

  return (
    <form className="select-panel" onSubmit={onFormSubmit}>
      <CharacterList>
        {characters.map((c, idx) => <CharacterRadio key={c.id} character={c} checked={selectedCharacter.id === c.id} onChange={onChange} />)}
      </CharacterList>
      <input className="select-panel__submit" type="submit" value="submit" ref={submitButtonRef} />
    </form>
  );
}

CharacterRadio.propTypes = {
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

CharacterRadio.defaultProps = {
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
function CharacterRadio({ character, checked, onChange }) {
  const serializedCharacter = JSON.stringify(character);
  const inputId = `selectPanelCharacterRadio${character.id}`;

  return (
    <label className="character-radio__character" htmlFor={inputId}>
      <input className="character-radio__radio" type="radio" id={inputId} value={serializedCharacter} checked={checked} name="select-panel" onChange={onChange} />
      <CharacterItem character={character} />
    </label>
  );
}
