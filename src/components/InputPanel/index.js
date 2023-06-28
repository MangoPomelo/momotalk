import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CharacterData } from '../../classes/characterData';
import { Avatar } from '../Avatar';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { sensei } from '../../assets/avatars';
import { dummy } from '../../assets/schoolLogos';

InputPanel.propTypes = {
  /**
   * The character chatting with
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  }),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

InputPanel.defaultProps = {
  character: new CharacterData(),
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
 *  character: CharacterData,
 *  onSubmit: onSubmit,
 * }} props Properties <br/>
 * @return {JSX.Element} InputPanel component <br/>
 */
export function InputPanel({ character, onSubmit }) {
  const senseiRef = useRef(new CharacterData('sensei', sensei, '', dummy));
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

  useUpdateEffect(() => {
    const isIdenticalCharacter = CharacterData.areEqual(character, selectedCharacter);

    // If the new comer is identical with the selected character, then there is no need to reset the selected character
    if (isIdenticalCharacter) {
      return;
    }

    // If current character is sensei then the selected character should be kept
    if (CharacterData.areEqual(selectedCharacter, senseiRef.current)) {
      return;
    }

    // Otherwise select the incoming character
    setSelectedCharacter(character);
  }, [JSON.stringify(character)]);

  useUpdateEffect(() => {
    // Skip first time render otherwise it will submit an empty message
    submitButtonRef.current.click();
  }, [imageMessage]);

  return (
    <form className="input-panel" onSubmit={onFormSubmit}>
      <input className="input-panel__image-upload" onChange={onInputImageChange} ref={imageUploadButtonRef} type="file" name="image-message" accept="image/*"/>
      <input className="input-panel__input" placeholder="Aa" type="text" id="inputPanel" name="message" value={textMessage} onChange={onInputTextChange} />
      <input className="input-panel__submit" type="submit" value="submit" disabled={textMessage.length <= 0 && imageMessage.length <= 0} ref={submitButtonRef} />
      <Candidate key={character.name} character={character} checked={CharacterData.areEqual(selectedCharacter, character)} onChange={onInputRadioChange}/>
      <Candidate key={senseiRef.current.name} character={senseiRef.current} checked={CharacterData.areEqual(selectedCharacter, senseiRef.current)} onChange={onInputRadioChange}/>
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

  if (CharacterData.isNullCharacter(character)) {
    return null;
  }

  return (
    <label className="input-panel__candidate-avatar" htmlFor={inputId}>
      <input className="input-panel__candidate-radio" checked={checked} onChange={onChange} type="radio" name="character" id={inputId} value={serializedCharacter} />
      <Avatar character={character} small/>
    </label>
  );
}
