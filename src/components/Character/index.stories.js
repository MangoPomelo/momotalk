import { Character } from '.';
import { CharacterData } from '../../classes/characterData';
import { millennium } from '../../assets/schoolLogos';

export default {
  title: 'Components/Character',
  component: Character,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    character: new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development development', millennium),
  },
};
