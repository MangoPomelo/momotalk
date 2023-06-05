import { MessageList } from '.';
import { Message } from '../Message';
import React from 'react';

export default {
  title: 'Components/MessageList',
  component: MessageList,
  parameters: {
    layout: 'centered',
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
          mode='sent'
        />,
        Message2: <Message
          avatar='/images/character/Sensei.png'
          name='sensei'
          content='How are you?'
          mode='sent'
        />,
        Message3: <Message
          avatar='/images/character/Alice.png'
          name='alice'
          content='Fine, thanks!'
          primary
          mode='received'
        />,
        Message4: <Message
          avatar='/images/character/Alice.png'
          name='alice'
          content='How is it going?'
          mode='received'
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
