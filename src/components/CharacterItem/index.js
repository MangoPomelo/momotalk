import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Avatar } from '../Avatar';

CharacterItem.propTypes = {
  /**
   * CharacterData of the Character
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  }).isRequired,
};

/**
 * CharacterItem component <br/>
 * @param {{
 *  character: CharacterData,
 * }} props Properties <br/>
 * @return {JSX.Element} Character component <br/>
 */
export function CharacterItem({
  character,
}) {
  return (
    <section className="character-item">
      <Avatar character={character}/>
      <span className="character-item__name">{character.name}</span>
      <span className="character-item__club">{character.club}</span>
      <img className="character-item__school-icon" src={character.schoolIcon} alt={'school icon'} />
    </section>
  );
}
