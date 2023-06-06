import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

MessageList.propTypes = {
  /**
   * Message item
   */
  children: PropTypes.node,
};

MessageList.defaultProps = {
  children: null,
};

/**
 * MessageList component <br/>
 * @param {{
 *  children: JSX.Element,
 * }} props Properties <br/>
 * @return {JSX.Element} MessageList component <br/>
 */
export function MessageList({
  children,
}) {
  return <ul className="message-list">{children}</ul>;
}
