import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from 'Provider'

import './styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelActionOpacity extends Component {
  render () {
    const { layer, translations } = this.props

    return (
      <div className='opacitySlider'>
        <div className='opacityTitle' id='opacity-slider'>{translations['_ol_kit.actions.opacity']}</div>
        <input
          type='slider'
          data-testid='LayerPanelAction.opacity'
          disabled={false}
          min={0.1}
          max={1}
          step={0.1}
          defaultValue={layer.getOpacity()}
          onChangeCommitted={() => this.forceUpdate()}
          aria-labelledby='opacity-slider'
          onChange={(e, v) => layer.setOpacity(v) } />
      </div>
    )
  }
}

LayerPanelActionOpacity.propTypes = {
  /** An openlayers `ol.layer` object */
  layer: PropTypes.object.isRequired,

  /** An object of translation key/value pairs */
  translations: PropTypes.object
}

export default connectToContext(LayerPanelActionOpacity)
