import { InputPanel } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Components/InputPanel',
  component: InputPanel,
  tags: ['autodocs'],
};

export const NoCandidate = {
  args: {},
};

export const HasCandidates = {
  args: {
    candidates: [
      new CharacterData('alice', '/images/character/Alice.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('yuzu', '/images/character/Yuzu.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
    ],
  },
};
