import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelContent extends Component {
  render () {
    const { children } = this.props

    return (
      <div className='cardContent' style={{
        padding: props.padding ? props.padding : '10px 15px',
      }}>
        {children}
      </div>
    )
  }
}

LayerPanelContent.propTypes = {
  /** The content of the LayerPanelContent (likely a collection of `LayerPanelList` components) */
  children: PropTypes.node
}

export default LayerPanelContent
