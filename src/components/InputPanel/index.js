import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CharacterData } from '../../classes/characterData';
import { Avatar } from '../Avatar';

InputPanel.propTypes = {
  /**
   * The characters that can be selected for chatting
   */
  candidates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    school: PropTypes.string,
  })),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

InputPanel.defaultProps = {
  candidates: [],
  onSubmit: () => {},
};

/**
 * Callback to be called when the form is submitted
 * @callback onSubmit
 * @param {Event} event Event sent when the form is submitted
 * @param {string} message Message sent by the form
 * @param {string} sender The name of the sender
 */


/**
 * InputPanel component <br/>
 * @param {{
 *  candidates: CharacterData[],
 *  onSubmit: onSubmit,
 * }} props Properties <br/>
 * @return {JSX.Element} InputPanel component <br/>
 */
export function InputPanel({ candidates, onSubmit }) {
  const [message, setMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(candidates[0] ?? new CharacterData('', '', '', ''));

  const onInputTextChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const onInputRadioChange = useCallback((event) => {
    const deserializedCharacter = JSON.parse(event.target.value);
    setSelectedCharacter(deserializedCharacter);
  }, []);

  const onFormSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(event, message, selectedCharacter);
    setMessage('');
  }, [message, selectedCharacter]);

  return (
    <form className="input-panel" onSubmit={onFormSubmit}>
      <input className="input-panel__input" placeholder="Aa" type="text" id="inputPanel" name="message" value={message} onChange={onInputTextChange} />
      <input className="input-panel__submit" type="submit" value="submit" disabled={message.length <= 0} />
      {candidates.map((c) => <Candidate key={c.name} character={c} checked={selectedCharacter.id === c.id} onChange={onInputRadioChange}/>)}
    </form>
  );
}

Candidate.propTypes = {
  /**
   * The character
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    school: PropTypes.string,
  }).isRequired,

  /**
   * Whether the character is selected or not
   */
  checked: PropTypes.bool,

  /**
   * Callback function to be called when the input radio is changed
   */
  onChange: PropTypes.func,
};

/**
 * Callback to be called when the input radio button is changed
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
function Candidate({ character, checked, onChange }) {
  const serializedCharacter = JSON.stringify(character);

  return (
    <label className="input-panel__candidate-avatar" htmlFor={character.id}>
      <input className="input-panel__candidate-radio" checked={checked} onChange={onChange} type="radio" name="character" id={character.id} value={serializedCharacter} />
      <Avatar character={character} small/>
    </label>
  );
}
