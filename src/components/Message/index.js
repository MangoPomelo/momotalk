import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

Message.propTypes = {
  /**
   * Avatar of the message sender
   */
  avatar: PropTypes.string,

  /**
   * Name of the message sender
   */
  name: PropTypes.string,

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
  avatar: '/images/character/Sensei.png',
  name: 'sensei',
  content: 'Konnichiwa',
  primary: false,
  fromMe: false,
};

/**
 * Message component <br/>
 * @param {{
 *  avatar: string,
 *  name: string,
 *  content: string,
 *  primary: boolean,
 *  fromMe: boolean,
 * }} props Properties <br/>
 * @return {JSX.Element} Message component <br/>
 */
export function Message({
  avatar,
  name,
  content,
  primary,
  fromMe,
}) {
  return (
    <li className={['message', primary && 'message--primary', fromMe && 'message--from-me'].join(' ')}>
      <img className="message__avatar" src={avatar} alt={name}/>
      <span className="message__name">{name}</span>
      <span className="message__content">{content}</span>
    </li>
  );
}
