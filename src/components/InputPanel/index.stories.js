import { InputPanel } from '.';
import { CharacterData } from '../../classes/characterData';
import { millennium } from '../../assets/schoolLogos';

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
      new CharacterData('yuzu', 'https://schale.gg/images/student/collection/Student_Portrait_Yuzu_Collection.webp', 'game development development', millennium),
      new CharacterData('alice', 'https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp', 'game development development', millennium),
    ],
  },
};
