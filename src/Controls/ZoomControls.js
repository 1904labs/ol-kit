import React from 'react'
import PropTypes from 'prop-types'

import ZoomIn from './ZoomIn'
import ZoomOut from './ZoomOut'
import ControlGroup from './ControlGroup'
import { connectToContext } from '~/src/Provider' // eslint-disable-line

import './styled.css'

/**
 * A map control group with zoom in and zoom out buttons
 * @component
 * @category Controls
 * @since 0.1.0
 */
function ZoomControls(props) {
  const { orientation } = props

  return (
    <ControlGroup orientation={orientation}>
      <ZoomIn />
      <ZoomOut />
    </ControlGroup>
  )
}

ZoomControls.propTypes = {
  /** reference to Openlayers map object */
  map: PropTypes.object.isRequired,

  /** the orientation of the zoom controls */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

export default connectToContext(ZoomControls)
