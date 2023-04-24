import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @component
 * @category Popup
 * @example ./example.md
 */
class PopupActionItem extends Component {
  render () {
    const { children, feature, title, disabled, onClick, style } = this.props

    return (
      <div className='action' role='button' onClick={disabled ? () => {} : (e) => onClick(e, feature)}>
        {title ? <div
          className='item'
          style={{
            color: props.disabled ? 'gray' : 'black'
          }}
          disabled={disabled}>
            {title}
          </div> : children}
      </div>
    )
  }
}

PopupActionItem.propTypes = {
  /** The title of the action item (if a custom child component is not specified) */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  /** The content of the action item (takes precendence over `title`) */
  children: PropTypes.node,

  /** Determines if the action item should be disabled */
  disabled: PropTypes.bool,

  /** Callback fired when the action item is clicked */
  onClick: PropTypes.func,

  /** Styles applied to <Item> */
  style: PropTypes.object,
  
  /** OpenLayers feature on which the action is being done */
  feature: PropTypes.object
}

PopupActionItem.defaultProps = {
  disabled: false,
  style: {}
}

export default PopupActionItem
