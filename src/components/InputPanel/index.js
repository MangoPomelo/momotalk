import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Character } from '../../class/character';

InputPanel.propTypes = {
  /**
   * The characters that can be selected for chatting
   */
  candidates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  })),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

InputPanel.defaultProps = {
  candidates: [
    new Character('alice', '/images/character/Alice.png'),
    new Character('sensei', '/images/character/Sensei.png'),
  ],
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
 *  candidates: Character[],
 *  onSubmit: onSubmit,
 * }} props Properties <br/>
 * @return {JSX.Element} InputPanel component <br/>
 */
export function InputPanel({ candidates, onSubmit }) {
  const [message, setMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(candidates[0] ?? new Character('', ''));

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
    <form onSubmit={onFormSubmit}>
      <input type="text" id="inputPanel" name="message" value={message} onChange={onInputTextChange} />
      <input type="submit" value="submit" disabled={message.length <= 0} />
      {candidates.map((c) => <Candidate key={c.name} character={c} checked={selectedCharacter.name === c.name} onChange={onInputRadioChange}/>)}
    </form>
  );
}

Candidate.propTypes = {
  /**
   * The character
   */
  character: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
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
 *  character: Character,
 *  checked: boolean,
 *  onChange: onChange,
 * }} props Properties <br/>
 * @return {JSX.Element} Candidate component <br/>
 */
function Candidate({ character, checked, onChange }) {
  const serializedCharacter = JSON.stringify(character);

  return (
    <>
      <input key={character.name} checked={checked} onChange={onChange} type="radio" name="character" id={character.name} value={serializedCharacter} />
      <label htmlFor={character.name}>{character.name}</label>
    </>
  );
}
