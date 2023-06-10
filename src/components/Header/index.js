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
  logo: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%"><g><g transform="rotate(22.5 39.76 32.4) scale(.125)" opacity="1" strokeWidth="8"><g strokeWidth="8"><path d="M346.77 80.68c23.36-23.36 32.46-54.31 25.4-78.35-24.04-7.05-55 2.04-78.35 25.4-23.36 23.36-32.46 54.31-25.41 78.36 24.04 7.05 55-2.05 78.36-25.41z" fill="%23FFFFFF" strokeWidth="8"></path><path d="M256 128.9c-105.79 0-191.55 85.77-191.55 191.55C64.45 426.24 150.22 512 256 512c105.79 0 191.55-85.76 191.55-191.55 0-105.78-85.76-191.55-191.55-191.55zM127.7 340.5a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm39.91-87.79a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm35.92 191.56a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm39.9-103.76a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm47.9-111.74a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm39.9 211.5a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9zm47.89-119.72a19.95 19.95 0 110-39.9 19.95 19.95 0 010 39.9z" fill="%23FFFFFF" stroke-width="8"></path></g></g></g></svg>',
  backgroundColor: 'rgb(255, 220, 66)',
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
