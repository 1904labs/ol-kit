import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * A button for drawing line strings.
 * @component
 * @category Draw
 * @since 0.18.0
 */
class DrawLine extends Component {
  render () {
    const { addInteraction, type, freehand, tooltipTitle } = this.props

    return (
      <div className='tooltip' title={tooltipTitle}>
        <button className='iconButton'
          data-testid='Draw.line'
          size='small'
          onClick={() => addInteraction({ type: 'LineString' })}>
          TimelineOutlinedIcon
        </button>
      </div>
    )
  }
}

DrawLine.propTypes = {
  /** the openlayers draw type */
  type: PropTypes.string,

  /** a function that adds the draw interaction to the openlayers map on click of the button */
  addInteraction: PropTypes.func,

  /** A boolean to check if the button is freehand */
  freehand: PropTypes.bool,

  /** a title for the tooltip */
  tooltipTitle: PropTypes.string
}

export default DrawLine
