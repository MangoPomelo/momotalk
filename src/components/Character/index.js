import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Avatar } from '../Avatar';

Character.propTypes = {
  /**
   * CharacterData of the Character
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    school: PropTypes.string,
  }).isRequired,
};

/**
 * Character component <br/>
 * @param {{
 *  character: CharacterData,
 * }} props Properties <br/>
 * @return {JSX.Element} Character component <br/>
 */
export function Character({
  character,
}) {
  return (
    <section className="character">
      <Avatar character={character}/>
      <span className="character__name">{character.name}</span>
      <span className="character__club">{character.club}</span>
      <img className="character__school" src={character.school} />
    </section>
  );
}
