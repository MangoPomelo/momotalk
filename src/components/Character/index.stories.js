import { Character } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/Character',
  component: Character,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    character: new CharacterData('alice', '/images/character/Alice.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
  },
};
