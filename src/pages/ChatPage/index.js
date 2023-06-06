import React, { useCallback, useState } from 'react';
import './index.css';
import { InputPanel } from '../../components/InputPanel';
import { MessageList } from '../../components/MessageList';
import { Message } from '../../components/Message';
import { CharacterData } from '../../classes/characterData';

/**
 * ChatPage component <br/>
 * @return {JSX.Element} ChatPage component <br/>
 */
export function ChatPage() {
  const [messageList, setMessageList] = useState([]);
  const [senderList, setSenderList] = useState([]);

  const onSubmit = useCallback((event, message, sender) => {
    setMessageList((messageList) => [...messageList, message]);
    setSenderList((senderList) => [...senderList, sender]);
  }, []);

  return (
    <>
      <MessageList>
        {messageList
            .map((msg, idx) => [msg, senderList[idx]])
            .map(([msg, sender]) => (
              <Message
                key={msg.message}
                character={new CharacterData(sender.name, `/images/character/${sender.name}.png`)}
                content={msg}
                primary
                fromMe={isMe(sender)}
              />
            ))
        }
      </MessageList>
      <InputPanel onSubmit={onSubmit}/>
    </>
  );
}

ChatPage.propTypes = {};


/**
 * Check if the character is "me"
 * @param {CharacterData} char Given character
 * @return {boolean} Check if the character is "me"
 */
function isMe(char) {
  return char.name.toLowerCase() === 'sensei';
}
