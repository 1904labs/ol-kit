import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelHeader extends Component {
  render() {
    const {
      actions,
      title,
      avatar,
    } = this.props

    return (
      <div className="cardHeader" title={title} avatar={avatar} action={actions} />
    )
  }
}

LayerPanelHeader.propTypes = {
  /** A string for the LayerPanelHeader title */
  title: PropTypes.string,
  /** array or component to render in the LayerPanelMenu */
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  /** component to render on the left side of the title */
  avatar: PropTypes.node,
}

export default LayerPanelHeader
