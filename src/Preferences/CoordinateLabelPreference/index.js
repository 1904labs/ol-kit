import React from 'react'
import PropTypes from 'prop-types'

import '../styled.css'

export class CoordinateLabelPreference extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pointLabelsEnabled: props.preferences.get('_POINT_LABELS_ENABLED') || false
    }
    this.updatePointLabelEnable = this.updatePointLabelEnable.bind(this)
  }

  updatePointLabelEnable = () => {
    this.setState({ pointLabelsEnabled: !this.state.pointLabelsEnabled })
    this.props.preferences.put('_POINT_LABELS_ENABLED', !this.state.pointLabelsEnabled).then(response => {
      this.props.onChange({ type: '_POINT_LABELS_ENABLED', response })
    })
  }

  render () {
    const { translations, compact } = this.props
    const { pointLabelsEnabled } = this.state

    return (
      <div>
        {!compact && <h5><b>{translations['_ol_kit.settings.coordinateLabels.toggleLabel']}</b></h5>}
        {!compact && <p>{translations['_ol_kit.settings.coordinateLabels.description']}</p>}
        <form className='formControlWrapper'>
          <div 
            className='switchContainer'
            style={{
              flexDirection: compact ? 'row' : 'column'
            }}
            id='_POINT_LABELS_ENABLED'>
            <label
              className='switchLabel'
              style={{
                order: compact ? 99 : 0
              }}
               htmlFor='_POINT_LABELS_ENABLED'>
                {compact ? translations['_ol_kit.settings.coordinateLabels.toggleLabel'] : translations['settings.turnOnOff']}
              </label>
            <switch color='primary'
              checked={pointLabelsEnabled}
              onChange={this.updatePointLabelEnable}
              value={pointLabelsEnabled}/>
          </div>
        </form>
      </div>
    )
  }
}

CoordinateLabelPreference.propTypes = {
  snappingEnabled: PropTypes.bool,
  snappingTolerance: PropTypes.number,
  translations: PropTypes.object,
  persistSnappingEnable: PropTypes.func,
  persistSnappingTolerance: PropTypes.func,
  preferences: PropTypes.object,
  onChange: PropTypes.func,
  compact: PropTypes.bool
}

export default CoordinateLabelPreference
