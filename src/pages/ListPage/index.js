import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchPanel } from '../../components/SearchPanel';
import { SelectPanel } from '../../components/SelectPanel';
import './index.css';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

ListPage.propTypes = {
  /**
   * Characters who are selectable
   */
  characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.string,
    schoolIcon: PropTypes.string,
  })),

  /**
   * Callback to be called when the form is submitted
   */
  onSubmit: PropTypes.func,
};

ListPage.defaultProps = {
  characters: [],
  onSubmit: () => {},
};

/**
 * Callback to be called when the form is submitted
 * @callback onSubmit
 * @param {Event} event Event sent when the form is submitted
 * @param {string} selectedCharacters Selected characters sent by the form
 */

/**
 * ListPage component <br/>
 * @param {{
 *  characters: CharacterData[],
 *  onSubmit: onSubmit
 * }} props Properties <br/>
 * @return {JSX.Element} ListPage component <br/>
 */
export function ListPage({ characters, onSubmit }) {
  const [maskArray, setMaskArray] = useState(characters.map(() => true));

  const onMaskArraySubmit = useCallback((evt, maskArray) => {
    setMaskArray(maskArray);
  }, []);

  useUpdateEffect(() => {
    setMaskArray(characters.map(() => true));
  }, [JSON.stringify(characters)]);

  return (
    <article className="list-page">
      <SearchPanel characters={characters} onSubmit={onMaskArraySubmit} />
      <SelectPanel characters={characters.filter((x, idx) => maskArray[idx])} onSubmit={onSubmit} />
    </article>
  );
}
