import { Message } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  args: {
    character: new CharacterData('Sensei', '/images/character/Sensei.png'),
    content: 'hello world',
    fromMe: false,
  },
};

export const Primary = {
  args: {
    primary: true,
  },
};

export const Following = {};

export const PrimaryFromMe = {
  args: {
    primary: true,
    fromMe: true,
  },
};

export const FollowingFromMe = {
  args: {
    fromMe: true,
  },
};
