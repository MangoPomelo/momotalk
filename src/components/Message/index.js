import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { useTranslation } from 'react-i18next';

Message.propTypes = {
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

Message.defaultProps = {
  primary: false,
  fromMe: false,
};

/**
 * Message component <br/>
 * @param {{
 *  sender: CharacterData,
 *  content: string,
 *  primary: boolean,
 *  fromMe: boolean,
 * }} props Properties <br/>
 * @return {JSX.Element} Message component <br/>
 */
export function Message({
  sender,
  content,
  primary,
  fromMe,
}) {
  const { t } = useTranslation();

  return (
    <li className={['message', primary && 'message--primary', fromMe && 'message--from-me'].join(' ')}>
      <img className="message__avatar" src={sender.avatar} alt={t(sender.name, { ns: 'students' })}/>
      <span className="message__name">{t(sender.name, { ns: 'students' })}</span>
      {content.startsWith('blob:') ? <img className="message__content" src={content} alt="image"/> : <span className="message__content">{content}</span>}
    </li>
  );
}
