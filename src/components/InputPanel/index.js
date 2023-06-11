import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CharacterData } from '../../classes/characterData';
import { Avatar } from '../Avatar';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

InputPanel.propTypes = {
  /**
   * The characters that can be selected for chatting
   */
  candidates: PropTypes.arrayOf(PropTypes.shape({
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
  const senseiRef = useRef(new CharacterData('sensei', '/images/character/Sensei.png', '', '/images/emblem/dummy.png'));
  const submitButtonRef = useRef(null);
  const imageUploadButtonRef = useRef(null);

  const [textMessage, setTextMessage] = useState('');
  const [imageMessage, setImageMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(senseiRef.current);

  const onInputImageChange = useCallback((event) => {
    if (event.target.files != null && event.target.files[0] != null) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImageMessage(imageUrl);
    }
  }, []);

  const onInputTextChange = useCallback((event) => {
    setTextMessage(event.target.value);
  }, []);

  const onInputRadioChange = useCallback((event) => {
    const deserializedCharacter = JSON.parse(event.target.value);
    setSelectedCharacter(deserializedCharacter);
  }, []);

  const onFormSubmit = useCallback((event) => {
    event.preventDefault();

    // Image message has superior priority
    if (imageMessage !== '') {
      onSubmit(event, imageMessage, selectedCharacter);
      setImageMessage('');

      // Since input file cannot be controlled, data has to be reset manually
      imageUploadButtonRef.current.value = null;
      return;
    }

    // Otherwise send text message
    if (textMessage !== '') {
      onSubmit(event, textMessage, selectedCharacter);
      setTextMessage('');
      return;
    }
  }, [textMessage, imageMessage, selectedCharacter]);

  useEffect(() => {
    const isSelectedIncluded = candidates.some((c) => c.id === selectedCharacter.id);

    // If the selected character is included in the candidates, then there is no need to reset the selected character
    if (isSelectedIncluded) {
      return;
    }

    setSelectedCharacter(senseiRef.current);
  }, [candidates]);

  useUpdateEffect(() => {
    // Skip first time render otherwise it will submit an empty message
    submitButtonRef.current.click();
  }, [imageMessage]);

  return (
    <form className="input-panel" onSubmit={onFormSubmit}>
      <input className="input-panel__image-upload" onChange={onInputImageChange} ref={imageUploadButtonRef} type="file" name="image-message" accept="image/*"/>
      <input className="input-panel__input" placeholder="Aa" type="text" id="inputPanel" name="message" value={textMessage} onChange={onInputTextChange} />
      <input className="input-panel__submit" type="submit" value="submit" disabled={textMessage.length <= 0 && imageMessage.length <= 0} ref={submitButtonRef} />
      {candidates.map((c) => <Candidate key={c.name} character={c} checked={selectedCharacter.id === c.id} onChange={onInputRadioChange}/>)}
      <Candidate character={senseiRef.current} checked={selectedCharacter.id === senseiRef.current.id} onChange={onInputRadioChange}/>
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
    schoolIcon: PropTypes.string,
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

Candidate.defaultProps = {
  checked: false,
  onChange: () => {},
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
  const inputId = `inputPanelCandidate${character.id}`;

  return (
    <label className="input-panel__candidate-avatar" htmlFor={inputId}>
      <input className="input-panel__candidate-radio" checked={checked} onChange={onChange} type="radio" name="character" id={inputId} value={serializedCharacter} />
      <Avatar character={character} small/>
    </label>
  );
}
