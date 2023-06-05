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
   * Size of the message which is whether "long" or "short"
   */
  primary: PropTypes.oneOf(['long', 'short']),

  /**
   * Mode of the message which is whether "sent" or "received"
   */
  mode: PropTypes.oneOf(['sent', 'received']),
};

Message.defaultProps = {
  avatar: '/images/character/Sensei.png',
  name: 'sensei',
  content: 'Konnichiwa',
  primary: false,
  mode: 'sent',
};

/**
 * Message component <br/>
 * @param {{
 *  avatar: string,
 *  name: string,
 *  content: string,
 *  primary: boolean,
 *  mode: ('sent' | 'received'),
 * }} props Properties <br/>
 * @return {JSX.Element} Message component <br/>
 */
export function Message({
  avatar,
  name,
  content,
  mode,
  primary,
}) {
  return (
    <li>
      <img src={avatar} alt={name}/>
      <span>{name}</span>
      <span>{content}</span>
    </li>
  );
}
