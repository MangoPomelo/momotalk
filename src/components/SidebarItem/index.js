import React from 'react';
import './index.css';
import { PropTypes } from 'prop-types';

SidebarItem.propTypes = {
  /**
   * Title of the SidebarItem, which must be unique for modal use
   */
  title: PropTypes.string.isRequired,

  /**
   * Icon of the SidebarItem
   */
  icon: PropTypes.string.isRequired,

  /**
   * Callback function to call when the SidebarItem is clicked
   */
  onClick: PropTypes.func,
};

SidebarItem.defaultProps = {
  onClick: () => {},
};


/**
 * @callback onClick
 * @param {Event} event Event sent when the item is clicked
 */

/**
 * SidebarItem component <br/>
 * @param {{
 *  title: string,
 *  icon: string,
 *  onClick: onClick,
 * }} props Props <br/>
 * @return {JSX.Element} SidebarItem component <br/>
 */
export function SidebarItem({ title, icon, onClick }) {
  return <button className="sidebar__item" onClick={onClick} style={{ backgroundImage: `url('${icon}')` }}>{title}</button>;
}
