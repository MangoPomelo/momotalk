import { CharacterList } from '.';
import { CharacterData } from '../../classes/characterData';
import { Character } from '../Character';
import React from 'react';

export default {
  title: 'Components/CharacterList',
  component: CharacterList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      options: ['Character1', 'Character2', 'Character3', 'Character4'],
      mapping: {
        Character1: <Character
          key="Character1"
          character={new CharacterData('midori', '/images/character/Midori.png', 'game development development', '/images/emblem/millennium_science_academy.png')}
        />,
        Character2: <Character
          key="Character2"
          character={new CharacterData('momoi', '/images/character/Momoi.png', 'game development development', '/images/emblem/millennium_science_academy.png')}
        />,
        Character3: <Character
          key="Character3"
          character={new CharacterData('yuzu', '/images/character/Yuzu.png', 'game development development', '/images/emblem/millennium_science_academy.png')}
        />,
        Character4: <Character
          key="Character4"
          character={new CharacterData('alice', '/images/character/Alice.png', 'game development development', '/images/emblem/millennium_science_academy.png')}
        />,
      },
      control: {
        type: 'multi-select',
        labels: {
          Character1: 'Midori',
          Character2: 'Momoi',
          Character3: 'Yuzu',
          Character4: 'Alice',
        },
      },
    },
  },
};

export const Default = {
  args: {
    children: null,
  },
};
