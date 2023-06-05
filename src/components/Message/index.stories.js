import { Message } from '.';

export default {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  args: {
    avatar: '/images/character/Sensei.png',
    name: 'sensei',
    content: 'hello world',
  },
};

export const LongSent = {
  args: {
    primary: true,
    mode: 'sent',
  },
};

export const ShortSent = {
  args: {
    mode: 'sent',
  },
};

export const LongReceived = {
  args: {
    primary: true,
    mode: 'received',
  },
};

export const ShortReceived = {
  mode: 'received',
};
