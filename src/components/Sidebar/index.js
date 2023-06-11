import React from 'react';
import './index.css';
import { PropTypes } from 'prop-types';

Sidebar.propTypes = {
  /**
   * Sidebar item
   */
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: null,
};

/**
 * Sidebar component <br/>
 * @param {{
*  children: JSX.Element,
* }} props Properties <br/>
 * @return {JSX.Element} Sidebar component <br/>
 */
export function Sidebar({ children }) {
  return (
    <aside className="sidebar">{children}</aside>
  );
}
