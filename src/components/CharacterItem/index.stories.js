import { CharacterItem } from '.';
import { CharacterData } from '../../classes/characterData';
import { millennium } from '../../assets/schoolLogos';

export default {
  title: 'Components/CharacterItem',
  component: CharacterItem,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    character: new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development development', millennium),
  },
};
