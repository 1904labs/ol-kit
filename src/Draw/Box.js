import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createBox } from 'ol/interaction/Draw'

import './styled.css'

const BOX_CONFIG = {
  type: 'Circle',
  geometryFunction: createBox()
}

/**
 * A button for drawing boxes.
 * @component
 * @category Draw
 * @since 0.18.0
 */
class DrawBox extends Component {
  isBoxDraw = () => {
    const { type, geometryFunction } = this.props

    return type === 'Circle' && typeof geometryFunction === 'function' && geometryFunction.toString() === BOX_CONFIG.geometryFunction.toString()
  }

  render () {
    const { addInteraction, tooltipTitle } = this.props

    return (
      <div className='tooltip' title={tooltipTitle}>
        <button className='iconButton'
          data-testid='Draw.box'
          size='small'
          onClick={() => addInteraction(BOX_CONFIG)}>
          <i class="zmdi zmdi-square-o"></i>
        </button>
      </div>
    )
  }
}

DrawBox.propTypes = {
  /** the openlayers draw type */
  type: PropTypes.string,

  /** A function that creates a openlayers draw interaction box */
  geometryFunction: PropTypes.func,

  /** a function that adds the draw interaction to the openlayers map on click of the button */
  addInteraction: PropTypes.func,

  /** a title for the tooltip */
  tooltipTitle: PropTypes.string
}

export default DrawBox
