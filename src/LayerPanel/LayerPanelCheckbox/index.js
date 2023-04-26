import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelCheckbox extends Component {
  render() {
    const { checkboxState, handleClick, color } = this.props
    const checkboxDataTestId = checkboxState ? 'LayerPanel.checked' : 'LayerPanel.unchecked'

    if (checkboxState === 'indeterminate') {
      return (
        <input
          type="checkbox"
          data-testid="LayerPanel.indeterminateCheckbox"
          indeterminateIcon="checkboxblank"
          onClick={(e) => handleClick(e, true)}
          checked={!!checkboxState}
          indeterminate
        >
          <i className="zmdi zmdi-minus-square" />
        </input>
      )
    }
    return (
      <input
        type="checkbox"
        data-testid={checkboxDataTestId}
        onClick={(e) => handleClick(e, !checkboxState)}
        checked={checkboxState}
      >
        <i className="zmdi zmdi-check-square" />
      </input>
    )
  }
}

LayerPanelCheckbox.propTypes = {
  /** checkbox checked state, either string('indeterminate') or bool */
  checkboxState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /** function that handles the click of checkbox. Returns the event and the state of the checkbox (bool) */
  handleClick: PropTypes.func.isRequired,
  /** string for checkbox checked color (hex) */
  color: PropTypes.string,
}

LayerPanelCheckbox.defaultProps = {
  color: '#152357',
}

export default LayerPanelCheckbox
