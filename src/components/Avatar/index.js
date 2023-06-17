import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

Avatar.propTypes = {
  /**
   * CharacterData of the Avatar
   */
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  }).isRequired,

  /**
   * Sizes of the Avatar
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Avatar.defaultProps = {
  size: 'medium',
};

/**
 * Avatar component <br/>
 * @param {{
 *  character: CharacterData,
 *  size: ('small' | 'medium' | 'large'),
 * }} props Properties <br/>
 * @return {JSX.Element} Avatar component <br/>
 */
export function Avatar({
  character,
  size,
}) {
  return <img className={`avatar avatar--${size}`} src={character.avatar} alt="avatar" loading="lazy" />;
}
