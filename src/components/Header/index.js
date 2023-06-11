import React from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

Header.propTypes = {
  /**
   * The url of the logo which will be injected into the img element
   */
  logo: PropTypes.string,

  /**
   * The title of the header
   */
  title: PropTypes.string.isRequired,

  /**
   * The background color of the header
   */
  backgroundColor: PropTypes.string,

  /**
   * The function to call when the help button is clicked
   */
  onHelpClick: PropTypes.func,
};

Header.defaultProps = {
  logo: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="0" y="0" viewBox="0 0 512 477.9" fill="%23FFFFFF"><path d="M101.8 396.4c-53.3 0-98.4 53.8-101.8 79.5 81.4 7.9 196.1-6.8 252.1-65-74.7 13.5-135.9-5.2-150.3-14.5zM281.4 412.5c55.1 73.3 137.7 58.5 230.5 63.3 3.5-42.1-73.2-80.9-103.9-82.2-39.9 28.5-123.3 19.5-126.6 18.9z"/><path d="M256.4 0C136.8 45 31.5 151.4 31.5 259.4c0 85 68.4 153.9 195.3 137.3 3.9-.5 7.6-1.1 11.2-1.7-1.1-.4-2.1-.9-2.9-1.3-19.4-9.8-53.4-56.7-39-112.6 1.4 59.3 39.7 102.6 57.1 111 2.7 1.3 11.9 4.6 25.5 6.7 51.9 8 164.9 4.7 187.9-116.7C498.9 111.4 256.4 0 256.4 0z"/></svg>',
  backgroundColor: 'rgb(252, 150, 171)',
  onHelpClick: () => {},
};

/**
 * Callback to be called when the help button is clicked
 * @callback onHelpClick
 * @param {Event} event Event sent when the help button is clicked
 */

/**
 * Header component <br/>
 * @param {{
 *  logo: string,
 *  title: string,
 *  backgroundColor: string,
 *  onHelpClick: onHelpClick
 * }} props Properties <br/>
 * @return {JSX.Element} Header component <br/>
 */
export function Header({ logo, title, backgroundColor, onHelpClick }) {
  return (
    <header className="header" style={{ backgroundColor }}>
      <img className="header__logo" src={logo} alt="logo"/>
      <span className="header__title">{title}</span>
      <button className="header__help" onClick={onHelpClick}>?</button>
    </header>
  );
}
