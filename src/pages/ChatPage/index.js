import React, { useCallback, useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { InputPanel } from '../../components/InputPanel';
import { MessageList } from '../../components/MessageList';
import { Message } from '../../components/Message';

ChatPage.propTypes = {
  /**
   * Characters who are candidates for chatting
   */
  candidates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    school: PropTypes.string,
  })),
};

ChatPage.defaultProps = {
  candidates: [],
};

/**
 * ChatPage component <br/>
 * @return {JSX.Element} ChatPage component <br/>
 */
export function ChatPage({ candidates }) {
  const [messageList, setMessageList] = useState([]);
  const [senderList, setSenderList] = useState([]);

  const onSubmit = useCallback((event, message, sender) => {
    setMessageList((messageList) => [...messageList, message]);
    setSenderList((senderList) => [...senderList, sender]);
  }, []);

  return (
    <React.Fragment>
      <MessageList>
        {messageList
            .map((msg, idx) => [msg, senderList[idx]])
            .map(([msg, sender], idx) => [msg, sender, senderList[idx - 1] ?? null])
            .map(([msg, sender, previousSender]) => [msg, sender, isPrimarySender(sender, previousSender)])
            .map(([msg, sender, isPrimary]) => (
              <Message
                key={msg.message}
                sender={sender}
                content={msg}
                primary={isPrimary}
                fromMe={isMe(sender)}
              />
            ))
        }
      </MessageList>
      <InputPanel onSubmit={onSubmit} candidates={candidates} />
    </React.Fragment>
  );
}

ChatPage.propTypes = {};

/**
 * Check if the current sender is sending a primary message
 * @param {CharacterData} currentSender Current sender
 * @param {CharacterData | null} previousSender Previous sender
 * @return {boolean} Whether if this sender is a primary message sender or not
 */
function isPrimarySender(currentSender, previousSender) {
  if (previousSender == null) {
    return true;
  }

  return previousSender.id !== currentSender.id;
}

/**
 * Check if the character is "me"
 * @param {CharacterData} char Given character
 * @return {boolean} Check if the character is "me"
 */
function isMe(char) {
  return char.name.toLowerCase() === 'sensei';
}
