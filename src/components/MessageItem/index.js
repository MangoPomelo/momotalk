import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { useTranslation } from 'react-i18next';

MessageItem.propTypes = {
  /**
   * CharacterData of the message sender
   */
  sender: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  }).isRequired,

  /**
   * Content of the message
   */
  content: PropTypes.string.isRequired,

  /**
   * Size of the message which is whether "detailed" or "concise"
   */
  primary: PropTypes.bool,

  /**
   * Mode of the message which is whether "from me" or not
   */
  fromMe: PropTypes.bool,
};

MessageItem.defaultProps = {
  primary: false,
  fromMe: false,
};

/**
 * MessageItem component <br/>
 * @param {{
 *  sender: CharacterData,
 *  content: string,
 *  primary: boolean,
 *  fromMe: boolean,
 * }} props Properties <br/>
 * @return {JSX.Element} MessageItem component <br/>
 */
export function MessageItem({
  sender,
  content,
  primary,
  fromMe,
}) {
  const { t } = useTranslation();
  const { name } = {
    name: t(sender.name, { ns: 'students' }),
  };

  return (
    <li className={['message-item', primary && 'message-item--primary', fromMe && 'message-item--from-me'].join(' ')}>
      <img className="message-item__avatar" src={sender.avatar} alt={name}/>
      <span className="message-item__name">{name}</span>
      {content.startsWith('blob:') ? <img className="message-item__content" src={content} alt="image"/> : <span className="message-item__content">{content}</span>}
    </li>
  );
}
