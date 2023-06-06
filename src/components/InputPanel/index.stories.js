import { InputPanel } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/InputPanel',
  component: InputPanel,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    candidates: [
      new CharacterData('alice', '/images/character/Alice.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('yuzu', '/images/character/Yuzu.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('sensei', '/images/character/Sensei.png', '', '/images/emblem/dummy.png'),
    ],
  },
};
