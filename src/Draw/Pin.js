import React from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * A button for drawing points.
 * @component
 * @category Draw
 * @since 0.18.0
 */
function DrawPin (props) {
  const { addInteraction, type, tooltipTitle } = props

  return (
    <div className='tooltip' title={tooltipTitle}>
      <button className='iconButton'
        data-testid='Draw.pin'
        size='small'
        onClick={() => addInteraction({ type })}>
        <span htmlColor={type === 'Pin' ? '#1976D2' : '#656565'}>
          <i class="zmdi zmdi-pin"></i>
        </span>
      </button>
    </div>
  )
}

DrawPin.propTypes = {
  /** the openlayers draw type */
  type: PropTypes.string,

  /** a function that adds the draw interaction to the openlayers map on click of the button */
  addInteraction: PropTypes.func.isRequired,

  /** a title for the tooltip */
  tooltipTitle: PropTypes.string
}

DrawPin.defaultProps = {
  tooltipTitle: 'Waypoint'
}

export default DrawPin
