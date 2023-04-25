import React, { useState } from 'react'
import PropTypes from 'prop-types'
import en from 'locales/en'

import 'styled.css'

/**
 * UI to choose parameters for HeatmapLayer types (rendered in LayerStyler)
 * @component
 * @category Heatmap
 */
function HeatmapControls (props) {
  const { layer, translations } = props
  const [blur, setBlur] = useState(layer?.getBlur() || 15)
  const [radius, setRadius] = useState(layer?.getRadius() || 5)

  const handleBlur = blur => {
    layer.setBlur(parseInt(blur))
    setBlur(blur)
  }
  const handleRadius = radius => {
    layer.setRadius(parseInt(radius))
    setRadius(radius)
  }

  return (
    <div className='container'>
      <span className='title'>{translations['_ol_kit.HeatmapControls.title']}</span>
      <div className='innerContainer'>
        <div className='inputContainer'>
          <label className='label' htmlFor='radius'>{translations['_ol_kit.HeatmapControls.radius']}</label>
          <input className='slider' id='radius' type='range' min='1' max='50' step='1' value={radius} onChange={(e) => handleRadius(e.target.value)}/>
        </div>
        <div className='inputContainer'>
          <label className='label' htmlFor='blur'>{translations['_ol_kit.HeatmapControls.blur']}</label>
          <input className='slider' id='blur' type='range' min='1' max='50' step='1' value={blur} onChange={(e) => handleBlur(e.target.value)}/>
        </div>
      </div>
    </div>
  )
}

HeatmapControls.propTypes = {
  /** HeatmapLayer type from ol-kit */
  layer: PropTypes.object.isRequired,
  /** Object with key/value pairs for translated strings */
  translations: PropTypes.shape({
    '_ol_kit.HeatmapControls.blur': PropTypes.string,
    '_ol_kit.HeatmapControls.radius': PropTypes.string,
    '_ol_kit.HeatmapControls.title': PropTypes.string
  }).isRequired
}

HeatmapControls.defaultProps = {
  translations: en
}

export default HeatmapControls
