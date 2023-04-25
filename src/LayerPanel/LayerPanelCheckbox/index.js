import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelCheckbox extends Component {
  render () {
    const { checkboxState, handleClick, color } = this.props
    const checkboxDataTestId = checkboxState ? 'LayerPanel.checked' : 'LayerPanel.unchecked'

    if (checkboxState === 'indeterminate') {
      return (
        <input type='checkbox' inputProps={{
          'data-testid': 'LayerPanel.indeterminateCheckbox'
        }} indeterminateIcon={'checkboxblank'}
        onClick={(e) => handleClick(e, true)} checked={!!checkboxState} indeterminate >
          <i class="zmdi zmdi-minus-square"></i>
        </input>
      )
    } else {
      return (
        <input type='checkbox' inputProps={{
          'data-testid': checkboxDataTestId
        }} onClick={(e) => handleClick(e, !checkboxState)} checked={checkboxState} >
          <i class="zmdi zmdi-check-square"></i>
        </input>
      )
    }
  }
}

LayerPanelCheckbox.propTypes = {
  /** checkbox checked state, either string('indeterminate') or bool */
  checkboxState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  /** function that handles the click of checkbox. Returns the event and the state of the checkbox (bool) */
  handleClick: PropTypes.func.isRequired,
  /** string for checkbox checked color (hex) */
  color: PropTypes.string
}

LayerPanelCheckbox.defaultProps = {
  color: '#152357'
}

export default LayerPanelCheckbox
