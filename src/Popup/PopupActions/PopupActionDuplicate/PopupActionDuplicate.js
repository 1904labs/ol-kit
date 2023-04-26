import React, { Component } from 'react'
import PropTypes from 'prop-types'
import olFeature from 'ol/Feature'
import olSourceVector from 'ol/source/Vector'
import { Snackbar } from '~/src/Snackbar'
import VectorLayer from '~/src/classes/VectorLayer'

import { PopupActionItem } from '~/src/Popup'
import { connectToContext } from '~/src/Provider'

class ActionDuplicate extends Component {
  constructor(props) {
    super(props)

    this.state = { showSnackbar: false }
  }

  duplicate = () => {
    const {
      feature, onActionEnd, map, translations,
    } = this.props
    const geometry = feature.getGeometry().clone()
    const clone = new olFeature({ geometry, name: 'Duplicated shape' })

    if (typeof onActionEnd === 'function') {
      onActionEnd(clone)
    } else {
      const layer = new VectorLayer({
        title: translations['_ol_kit.PopupActionDuplicate.title'],
        source: new olSourceVector(),
      })

      clone.setStyle(null)
      layer.getSource().addFeature(clone)

      map.addLayer(layer)
    }

    this.setState({ showSnackbar: true })
  }

  render() {
    const { translations } = this.props
    const { showSnackbar } = this.state

    return (
      <>
        <PopupActionItem title={translations['_ol_kit.PopupActionDuplicate.title']} onClick={this.duplicate} />
        <Snackbar
          open={showSnackbar}
          closeSnackbar={() => this.setState({ showSnackbar: false })}
          duration={5000}
          message={translations['_ol_kit.PopupActionDuplicate.alert']}
          variant="info"
        />
      </>
    )
  }
}

ActionDuplicate.propTypes = {
  /** olFeature to duplicate */
  feature: PropTypes.object,
  /** Callback function that will inform when action is complete */
  onActionEnd: PropTypes.func,
  /** olMap */
  map: PropTypes.object,
  /** Callback to close Popup */
  onClose: PropTypes.func,
  /** Object with key/value pairs for translated strings */
  translations: PropTypes.shape({
    '_ol_kit.PopupActionDuplicate.alert': PropTypes.string,
    '_ol_kit.PopupActionDuplicate.title': PropTypes.string,
  }).isRequired,
}

ActionDuplicate.defaultProps = {
  translations: {
    '_ol_kit.PopupActionDuplicate.alert': 'Shape duplicated!',
    '_ol_kit.PopupActionDuplicate.title': 'Duplicate Shape',
  },
}

export default connectToContext(ActionDuplicate)
