import { SelectPanel } from '.';
import { CharacterData } from '../../classes/characterData';
import { millennium } from '../../assets/schoolLogos';

export default {
  title: 'Components/SelectPanel',
  component: SelectPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    characters: [
      new CharacterData('midori', 'https://schale.gg/images/student/collection/Student_Portrait_Midori_Collection.webp', 'game development development', millennium),
      new CharacterData('momoi', 'https://schale.gg/images/student/collection/Student_Portrait_Momoi_Collection.webp', 'game development development', millennium),
      new CharacterData('yuzu', 'https://schale.gg/images/student/collection/Student_Portrait_Yuzu_Collection.webp', 'game development development', millennium),
      new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development development', millennium),
    ],
  },
};
