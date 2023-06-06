import { Avatar } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    character: new CharacterData('Sensei', '/images/character/Sensei.png'),
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
