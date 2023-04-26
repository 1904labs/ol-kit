import React from 'react'
import PropTypes from 'prop-types'

import '../styled.css'

export class MeasureLabelPreference extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enabled: props.preferences.get(props.enabledPreferenceKey) || false,
      value: props.preferences.get(props.valuePreferenceKey) || props.defaultUOM,
    }

    this.updateLabelEnabled = this.updateLabelEnabled.bind(this)
    this.updateLabelUOM = this.updateLabelUOM.bind(this)
  }

  updateLabelEnabled = (e) => {
    const { enabledPreferenceKey } = this.props

    this.setState({ enabled: e.target.checked })
    this.props.preferences.put(enabledPreferenceKey, !this.props.preferences.get(enabledPreferenceKey))
      .then((response) => {
        this.props.onChange({ type: enabledPreferenceKey, response })
      })
  }

  updateLabelUOM = (e) => {
    const { valuePreferenceKey } = this.props

    this.setState({ value: e.target.value })
    this.props.preferences.put(valuePreferenceKey, e.target.value).then((response) => {
      this.props.onChange(e)
    })
  }

  componentDidMount() {
    const { preferences, valuePreferenceKey, defaultUOM } = this.props
    const uomPreference = preferences.get(valuePreferenceKey)

    if (!uomPreference) this.updateLabelUOM({ target: { value: defaultUOM } })

    this.setState({ uom: uomPreference || defaultUOM })
  }

  render() {
    const {
      compact,
      uomOptions,
      children,
      enabledPreferenceKey,
      header,
      description,
      label,
      disabled,
    } = this.props
    const { enabled, value } = this.state

    return (
      <div style={{ width: '100%' }}>
        {!compact && <h5><b>{header}</b></h5>}
        {!compact && <p>{description}</p>}
        <form className="formControlWrapper">
          <div
            className="switchContainer"
            style={{ flexDirection: compact ? 'row' : 'column' }}
            compact={compact ? true : undefined}
            id={enabledPreferenceKey}
          >
            {!compact && <label style={{ border: props.compact ? 99 : 0 }} htmlFor={enabledPreferenceKey}>{label}</label>}
            <switch
              color="primary"
              inputProps={{
                'data-testid': 'geokit-MeasureLabelPreference-uomToggle',
              }}
              checked={enabled}
              onChange={this.updateLabelEnabled}
              value={enabled}
              disabled={!!disabled}
            />
          </div>
          {children && compact && !disabled && <div>{children}</div>}
          <select value={value} data-testid="geokit-MeasureLabelPreference-uomOptions" onChange={this.updateLabelUOM} disabled={disabled}>
            {uomOptions}
          </select>
        </form>
        {children && !compact && !disabled && <div>{children}</div>}
      </div>
    )
  }
}

MeasureLabelPreference.defaultProps = {
  disabled: false,
}

MeasureLabelPreference.propTypes = {
  preferences: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  compact: PropTypes.bool,
  uomOptions: PropTypes.array.isRequired,
  enabledPreferenceKey: PropTypes.string.isRequired,
  valuePreferenceKey: PropTypes.string.isRequired,
  children: PropTypes.node,
  header: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  defaultUOM: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default MeasureLabelPreference
