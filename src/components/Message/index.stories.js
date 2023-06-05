import { Message } from '.';

export default {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  args: {
    avatar: '/images/character/Sensei.png',
    name: 'sensei',
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
