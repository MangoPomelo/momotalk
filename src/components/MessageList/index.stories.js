import { MessageList } from '.';
import { CharacterData } from '../../class/characterData';
import { Message } from '../Message';
import React from 'react';

export default {
  title: 'Components/MessageList',
  component: MessageList,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      options: ['Message1', 'Message2', 'Message3', 'Message4'],
      mapping: {
        Message1: <Message
          key="Message1"
          character={new CharacterData('sensei', '/images/character/Sensei.png')}
          content='Hello~!'
          primary
          fromMe
        />,
        Message2: <Message
          key="Message2"
          character={new CharacterData('sensei', '/images/character/Sensei.png')}
          content='How are you?'
          fromMe
        />,
        Message3: <Message
          key="Message3"
          character={new CharacterData('alice', '/images/character/Alice.png')}
          content='Fine, thanks!'
          primary
        />,
        Message4: <Message
          key="Message4"
          character={new CharacterData('alice', '/images/character/Alice.png')}
          content='How is it going?'
        />,
      },
      control: {
        type: 'multi-select',
        labels: {
          Message1: 'Hello~!',
          Message2: 'How are you??',
          Message3: 'Fine, thanks!',
          Message4: 'How is it going?',
        },
      },
    },
  },
};

export const Default = {
  args: {
    children: null,
  },
};
