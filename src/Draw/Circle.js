import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * A button for drawing circles.
 * @component
 * @category Draw
 * @since 0.18.0
 */
class DrawCircle extends Component {
  render () {
    const { addInteraction, type, geometryFunction, tooltipTitle } = this.props

    return (
      <div className='tooltip' title={tooltipTitle}>
        <button className='iconButton'
          data-testid='Draw.circle'
          size='small'
          onClick={() => addInteraction({ type: 'Circle' })}>
          <span htmlColor={type === 'Circle' && !geometryFunction ? '#1976D2' : '#656565'}>
            <i class="zmdi zmdi-circle-o"></i>
          </span>
        </button>
      </div>
    )
  }
}

DrawCircle.propTypes = {
  /** the openlayers draw type */
  type: PropTypes.string,

  /** A function that creates a openlayers draw interaction box */
  geometryFunction: PropTypes.func,

  /** a function that adds the draw interaction to the openlayers map on click of the button */
  addInteraction: PropTypes.func,

  /** a title for the tooltip */
  tooltipTitle: PropTypes.string
}

export default DrawCircle
