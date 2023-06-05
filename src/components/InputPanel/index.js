import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

InputPanel.propTypes = {
  /**
   * The name of the candidates that can be selected for chatting
   */
  candidates: PropTypes.arrayOf(PropTypes.string),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

InputPanel.defaultProps = {
  candidates: ['Sensei', 'Alice'],
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
 *  candidates: string[],
 *  onSubmit: onSubmit,
 * }} props Properties <br/>
 * @return {JSX.Element} InputPanel component <br/>
 */
export function InputPanel({ candidates, onSubmit }) {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(candidates[0] ?? '');

  const onInputTextChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const onInputRadioChange = useCallback((event) => {
    setSelected(event.target.value);
  }, []);

  const onFormSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(event, message, selected);
    setMessage('');
  }, [message, selected]);

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" id="inputPanel" name="message" value={message} onChange={onInputTextChange} />
      <input type="submit" value="submit" disabled={message.length <= 0} />
      {candidates.map((c) => <Candidate key={c} characterName={c} checked={selected === c} onChange={onInputRadioChange}/>)}
    </form>
  );
}

Candidate.propTypes = {
  /**
   * The name of the character
   */
  characterName: PropTypes.string.isRequired,

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
 *  characterName: string,
 *  checked: boolean,
 *  onChange: onChange,
 * }} props Properties <br/>
 * @return {JSX.Element} Candidate component <br/>
 */
function Candidate({ characterName, checked, onChange }) {
  return (
    <>
      <input key={characterName} checked={checked} onChange={onChange} type="radio" name="character" id={characterName} value={characterName} />
      <label htmlFor={characterName}>{characterName}</label>
    </>
  );
}
