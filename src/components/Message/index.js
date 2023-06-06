import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Character } from '../../class/character';

Message.propTypes = {
  /**
   * Character of the message sender
   */
  character: PropTypes.exact({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),

  /**
   * Content of the message
   */
  content: PropTypes.string,

  /**
   * Size of the message which is whether "detailed" or "concise"
   */
  primary: PropTypes.bool,

  /**
   * Mode of the message which is whether "from me" or not
   */
  fromMe: PropTypes.bool,
};

Message.defaultProps = {
  character: new Character('sensei', '/images/character/Sensei.png'),
  content: 'Konnichiwa',
  primary: false,
  fromMe: false,
};

/**
 * Message component <br/>
 * @param {{
 *  character: Character,
 *  content: string,
 *  primary: boolean,
 *  fromMe: boolean,
 * }} props Properties <br/>
 * @return {JSX.Element} Message component <br/>
 */
export function Message({
  character,
  content,
  primary,
  fromMe,
}) {
  return (
    <li className={['message', primary && 'message--primary', fromMe && 'message--from-me'].join(' ')}>
      <img className="message__avatar" src={character.avatar} alt={character.name}/>
      <span className="message__name">{character.name}</span>
      <span className="message__content">{content}</span>
    </li>
  );
}
