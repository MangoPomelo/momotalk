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
export function SidebarItem(props) {
  const title = props.title;
  const icon = props.icon;
  const onClick = props.onClick;

  return (
    <img className="sidebar__item" onClick={onClick} src={icon} alt={title} />
  );
}
