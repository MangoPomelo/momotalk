import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

CharacterList.propTypes = {
  /**
   * Message item
   */
  children: PropTypes.node,
};

CharacterList.defaultProps = {
  children: null,
};

/**
 * CharacterList component <br/>
 * @param {{
 *  children: JSX.Element,
 * }} props Properties <br/>
 * @return {JSX.Element} CharacterList component <br/>
 */
export function CharacterList({
  children,
}) {
  return <ul className="character-list">{children}</ul>;
}
