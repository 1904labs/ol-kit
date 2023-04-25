import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ControlGroup from './ControlGroup'
import CurrentLocation from './CurrentLocation'

import ZoomIn from './ZoomIn'
import ZoomOut from './ZoomOut'
import Compass from './Compass'
import ScaleLine from './ScaleLine'
import { connectToContext } from 'Provider'

import './styled.css'

/**
 * A map control container with built-in positioning
 * @component
 * @category Controls
 * @since 0.1.0
 */
function Controls (props) {
  const { children, map, position, orientation, style } = props

  return (
    ReactDOM.createPortal(
      <div className='controlsContainer'
        style={{
          left: position.includes('left') ? '14px' : 'unset',
          right: position.includes('right') ? '14px' : 'unset',
          bottom: position.includes('bottom') ? '0px' : 'unset',
          top: position.includes('top') ? '14px' : 'unset',
          flexDirection: position.orientation === 'vertical' ? 'column' : 'row',
          ...style
        }}
      >
        {children || (
          <>
            <ScaleLine map={map} orientation={orientation}/>
            <ControlGroup map={map} orientation={orientation}>
              <CurrentLocation map={map} />
              <ZoomIn map={map} />
              <ZoomOut map={map} />
            </ControlGroup>
            <Compass map={map} />
          </>
        )}
      </div>,
      map.getTargetElement()
    )
  )
}

Controls.defaultProps = {
  position: 'bottom-right',
  orientation: 'horizontal',
  style: {}
}

Controls.propTypes = {
  /** pass child comps to opt out of the default controls */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** reference to Openlayers map object */
  map: PropTypes.object.isRequired,
  /** render controls in a position relative to the map  */
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  /** render controls in a position relative to the map  */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /** apply inline styles to the Map Controls container */
  style: PropTypes.object
}

export default connectToContext(Controls)
