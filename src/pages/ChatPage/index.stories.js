import { ChatPage } from '.';
import { CharacterData } from '../../classes/characterData';

export default {
  title: 'Pages/ChatPage',
  component: ChatPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const NoCandidate = {
  args: {},
};

export const HasCandidates = {
  args: {
    candidates: [
      new CharacterData('midori', '/images/character/Midori.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('momoi', '/images/character/Momoi.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('yuzu', '/images/character/Yuzu.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('alice', '/images/character/Alice.png', 'game development development', '/images/emblem/millennium_science_academy.png'),
      new CharacterData('sensei', '/images/character/Sensei.png', '', '/images/emblem/dummy.png'),
    ],
  },
};
