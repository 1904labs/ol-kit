import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LayerPanelExpandableList extends Component {
  render() {
    const { show, open, handleClick } = this.props

    if (show) {
      if (open) {
        return <button data-testid="LayerPanel.collapseLayer" onClick={handleClick}>expandless</button>
      }
      return <button data-testid="LayerPanel.expandLayer" onClick={handleClick}>expandmore</button>
    }
    return null
  }
}

LayerPanelExpandableList.propTypes = {
  show: PropTypes.bool,
  open: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

export default LayerPanelExpandableList
