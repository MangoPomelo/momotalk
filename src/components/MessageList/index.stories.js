import { MessageList } from '.';
import { CharacterData } from '../../classes/characterData';
import { MessageItem } from '../MessageItem';
import React from 'react';
import { sensei } from '../../assets/avatars';
import { dummy, millennium } from '../../assets/schoolLogos';

export default {
  title: 'Components/MessageList',
  component: MessageList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      options: ['Message1', 'Message2', 'Message3', 'Message4'],
      mapping: {
        Message1: <MessageItem
          key="Message1"
          sender={new CharacterData('sensei', sensei, '', dummy)}
          content='Hello~!'
          primary
          fromMe
        />,
        Message2: <MessageItem
          key="Message2"
          sender={new CharacterData('sensei', sensei, '', dummy)}
          content='How are you?'
          fromMe
        />,
        Message3: <MessageItem
          key="Message3"
          sender={new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development department', millennium)}
          content='Fine, thanks!'
          primary
        />,
        Message4: <MessageItem
          key="Message4"
          sender={new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development department', millennium)}
          content='How is it going?'
        />,
      },
      control: {
        type: 'multi-select',
        labels: {
          Message1: 'Hello~!',
          Message2: 'How are you?',
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
