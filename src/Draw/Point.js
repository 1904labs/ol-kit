import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * A button for drawing points.
 * @component
 * @category Draw
 * @since 0.18.0
 */
class DrawPoint extends Component {
  render () {
    const { addInteraction, type, tooltipTitle } = this.props

    return (
      <div className='tooltip' title={tooltipTitle}>
        <button className='iconButton'
          data-testid='Draw.point'
          size='small'
          onClick={() => addInteraction({ type: 'Point' })}>
          <span htmlColor={type === 'Point' ? '#1976D2' : '#656565'}> 
            <i class="zmdi zmdi-circle"></i>
          </span>
        </button>
      </div>
    )
  }
}

DrawPoint.propTypes = {
  /** the openlayers draw type */
  type: PropTypes.string,

  /** a function that adds the draw interaction to the openlayers map on click of the button */
  addInteraction: PropTypes.func,

  /** a title for the tooltip */
  tooltipTitle: PropTypes.string
}

export default DrawPoint
