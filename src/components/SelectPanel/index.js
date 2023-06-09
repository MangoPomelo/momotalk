import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Character } from '../Character';
import { CharacterList } from '../CharacterList';

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
 *  onSubmit: onSubmit
 * }} props Properties <br/>
 * @return {JSX.Element} SelectPanel component <br/>
 */
export function SelectPanel({ characters, onSubmit }) {
  const [checkedStates, setCheckedStates] = useState(new Array(characters.length).fill(false));
  const isFirstTimeRenderRef = useRef(true);
  const submitButtonRef = useRef(null);

  const onChange = useCallback((event, idx) => {
    const newCheckedStates = checkedStates.map((x, i) => i === idx ? !x : x);
    setCheckedStates(newCheckedStates);
  }, [checkedStates]);

  const onFormSubmit = useCallback((event) => {
    const selected = characters.filter((c, idx) => checkedStates[idx]);
    event.preventDefault();
    onSubmit(event, selected);
  }, [checkedStates, characters]);

  useLayoutEffect(() => {
    // Skip first time render otherwise it will submit and trigger other observers render
    if (isFirstTimeRenderRef.current) {
      isFirstTimeRenderRef.current = false;
      return;
    }

    submitButtonRef.current.click();
  }, [checkedStates]);

  useEffect(() => {
    setCheckedStates(new Array(characters.length).fill(false));
  }, [characters]);

  return (
    <form className="select-panel" onSubmit={onFormSubmit}>
      <CharacterList>
        {characters.map((c, idx) => <WrappedCharacter key={c.id} character={c} checked={checkedStates[idx]} onChange={(e) => onChange(e, idx)} />)}
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
  const inputId = `selectPanelWrappedCharacter${character.id}`;

  return (
    <label className="wrapped-character__character" htmlFor={inputId}>
      <input className="wrapped-character__checkbox" type="checkbox" id={inputId} value={character.name} checked={checked} name={character.name} onChange={onChange} />
      <Character character={character} />
    </label>
  );
}
