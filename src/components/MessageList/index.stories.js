import { MessageList } from '.';
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
          avatar='/images/character/Sensei.png'
          name='sensei'
          content='Hello~!'
          primary
          fromMe
        />,
        Message2: <Message
          avatar='/images/character/Sensei.png'
          name='sensei'
          content='How are you?'
          fromMe
        />,
        Message3: <Message
          avatar='/images/character/Alice.png'
          name='alice'
          content='Fine, thanks!'
          primary
        />,
        Message4: <Message
          avatar='/images/character/Alice.png'
          name='alice'
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
