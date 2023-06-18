import { CharacterList } from '.';
import { CharacterData } from '../../classes/characterData';
import { CharacterItem } from '../CharacterItem';
import React from 'react';
import { millennium } from '../../assets/schoolLogos';

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
        Character1: <CharacterItem
          key="Character1"
          character={new CharacterData('midori', 'https://schale.gg/images/student/collection/Student_Portrait_Midori_Collection.webp', 'game development department', millennium)}
        />,
        Character2: <CharacterItem
          key="Character2"
          character={new CharacterData('momoi', 'https://schale.gg/images/student/collection/Student_Portrait_Momoi_Collection.webp', 'game development department', millennium)}
        />,
        Character3: <CharacterItem
          key="Character3"
          character={new CharacterData('yuzu', 'https://schale.gg/images/student/collection/Student_Portrait_Yuzu_Collection.webp', 'game development department', millennium)}
        />,
        Character4: <CharacterItem
          key="Character4"
          character={new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development department', millennium)}
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
