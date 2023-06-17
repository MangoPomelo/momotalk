import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Avatar } from '../Avatar';
import { useTranslation } from 'react-i18next';

Character.propTypes = {
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
 * Character component <br/>
 * @param {{
 *  character: CharacterData,
 * }} props Properties <br/>
 * @return {JSX.Element} Character component <br/>
 */
export function Character({
  character,
}) {
  const { t } = useTranslation();

  return (
    <section className="character">
      <Avatar character={character}/>
      <span className="character__name">{t(character.name, { ns: 'students' })}</span>
      <span className="character__club">{t(character.club, { ns: 'localization' })}</span>
      <img className="character__school-icon" src={character.schoolIcon} alt={'school icon'} />
    </section>
  );
}
