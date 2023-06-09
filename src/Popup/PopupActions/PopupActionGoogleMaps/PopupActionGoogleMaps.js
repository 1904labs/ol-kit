import React from 'react'
import PropTypes from 'prop-types'
import en from  'locales/en'
import { PopupActionLink } from 'Popup'

import { getCenter } from 'ol/extent'
import { transform } from 'ol/proj'

/**
 * Popup action item to navigate to a feature using google maps
 * @component
 * @category PopupActionGoogleMaps
 */
const PopupActionGoogleMaps = ({ feature, translations }) => {

  const [ long, lat ] = transform(getCenter(feature.getGeometry().getExtent()), 'EPSG:3857', 'EPSG:4326')
  const url = `https://www.google.com/maps/search/?api=1&query=${ lat },${ long }`
  
  return (
    <PopupActionLink
      title={translations['_ol_kit.PopupActionGoogleMaps.navigateGoogleMaps']}
      href={url} />
  )
}

PopupActionGoogleMaps.propTypes = {
  /** The OpenLayers feature of the current popup page */
  feature: PropTypes.object,

  /** Object with key/value pairs for translated strings */
  translations: PropTypes.shape({
    '_ol_kit.PopupActionGoogleMaps.navigateGoogleMaps': PropTypes.string
  }).isRequired
}

PopupActionGoogleMaps.defaultProps = {
  translations: en
}

export default PopupActionGoogleMaps