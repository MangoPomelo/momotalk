import { Avatar } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    character: new CharacterData('sensei', '/images/character/Sensei.png', '', '/images/emblem/dummy.png'),
  },
};

export const Small = {
  args: {
    size: 'small',
  },
};

export const Medium = {
  args: {
    size: 'medium',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};
