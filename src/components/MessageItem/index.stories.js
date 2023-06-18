import { MessageItem } from '.';
import { CharacterData } from '../../classes/characterData';
import { sensei } from '../../assets/avatars';
import { dummy } from '../../assets/schoolLogos';

export default {
  title: 'Components/MessageItem',
  component: MessageItem,
  tags: ['autodocs'],
  args: {
    sender: new CharacterData('sensei', sensei, '', dummy),
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
