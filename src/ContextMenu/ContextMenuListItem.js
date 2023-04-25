import React from 'react'
import PropTypes from 'prop-types'

import 'styled.css'

/** A context menu list item with a title and click handler
 * @component
 * @category ContextMenu
 * @since 0.16.0
 */
class ContextMenuListItem extends React.PureComponent {
  render () {
    const { title, disabled, onClick } = this.props

    return (
      <div
        className={disabled ? 'listItem-disabled' : 'listItem'}
        style={{
          cursor: disabled ? 'default' : 'pointer',
          color: disabled ? '#ccc' : '#000'
        }}
        disabled={disabled}
        onClick={e => !disabled ? onClick(e) : null}>
        {title}
      </div>
    )
  }
}

ContextMenuListItem.propTypes = {
  /** Title text which is shown for the list item */
  title: PropTypes.string.isRequired,

  /** A callback function when the menu item is clicked */
  onClick: PropTypes.func.isRequired,

  /** Indicates if the context menu item is clickable */
  disabled: PropTypes.bool.isRequired
}

ContextMenuListItem.defaultProps = {
  disabled: false
}

export default ContextMenuListItem
