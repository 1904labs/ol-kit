import React from 'react'
import PropTypes from 'prop-types'

import { connectToContext } from 'Provider'

import './styled.css'

/**
 * A control group button wrapper using a Material IconButton
 * @component
 * @category Controls
 * @since 0.14.0
 */
function ControlGroupButton (props) {
  return (
    <div className='iconWrapper'>
      <button {...props} style={{ padding: '3px' }} size='large'>
        {props.icon || props.children}
      </button>
    </div>
  )
}

ControlGroupButton.propTypes = {
  /** Pass an icon to display as either the icon prop or as a child */
  icon: PropTypes.node,
  /** Pass an icon to display as either the icon prop or as a child */
  children: PropTypes.node
}

export default connectToContext(ControlGroupButton)
