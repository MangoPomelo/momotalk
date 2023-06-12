import { Avatar } from '.';
import { CharacterData } from '../../classes/characterData';
import { sensei } from '../../assets/avatars';
import { dummy } from '../../assets/schoolLogos';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    character: new CharacterData('sensei', sensei, '', dummy),
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
