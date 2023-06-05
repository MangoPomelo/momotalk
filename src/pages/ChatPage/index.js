import React, { useCallback, useState } from 'react';
import './index.css';
import { InputPanel } from '../../components/InputPanel';
import { MessageList } from '../../components/MessageList';
import { Message } from '../../components/Message';

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
                avatar={`/images/character/${sender}.png`}
                name={sender}
                content={msg}
                primary
                fromMe={sender.toLowerCase() === 'sensei'}
              />
            ))
        }
      </MessageList>
      <InputPanel onSubmit={onSubmit}/>
    </>
  );
}

ChatPage.PropTypes = {};
