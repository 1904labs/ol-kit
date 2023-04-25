import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from 'Provider'

import './styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeIndex: 0,
      showLayerPanel: false
    }
  }

  handleChange = (_, activeIndex) => {
    this.setState({ activeIndex })
  }

  showLayerPanel = () => {
    this.setState({ showLayerPanel: true })
  }

  hideLayerPanel = () => {
    this.setState({ showLayerPanel: false })
  }

  render () {
    const { inline, style, children, translations, layerPanelTitle } = this.props
    const { activeIndex, showLayerPanel } = this.state
    const tabDataTestId = showLayerPanel ? 'LayerPanel.close' : 'LayerPanel.open'

    return <>
      {!showLayerPanel && <div id='initialtab' onClick={this.showLayerPanel} icon={<span className='zmdi zmdi-layers'></span>} />}
      <div
        className='_popup_boundary card'
        style={{
          position: inline ? 'inline' : 'absolute',
          right: showLayerPanel ? '15px' : '-400px',
          minHeight: `${200 + (children.length || 1 * 40)}px`
        }} >
        <div className='cardContent'>
          <h5>{layerPanelTitle}</h5>
          <button onClick={this.hideLayerPanel} size="large">x</button>
        </div>
        <div
          className='tabs'
          style={{
            backgroundColor: showLayerPanel ? '#152357' : '#fff'
          }}
          value={activeIndex}
          onChange={this.handleChange} >
          {showLayerPanel &&
            React.Children.map(children, (child, i) => {
              if (child) return <div className='tab' key={i} label={child.props.tabIcon || child.props.label} />
            })
          }
        </div>
        {translations && React.Children.toArray(children)[activeIndex]}
      </div>
    </>;
  }
}

LayerPanelBase.propTypes = {
  /** Render the component inline (without absolute positioning) */
  inline: PropTypes.bool,

  /** The content of the layer panel (likely a set of `LayerPanelPage` components) */
  children: PropTypes.node.isRequired,

  /** An object of styles spread on the layerpanel */
  style: PropTypes.object,

  /** Title of the LayerPanel */
  layerPanelTitle: PropTypes.string,

  /** Object with key/value pairs for translated strings */
  translations: PropTypes.object
}

export default connectToContext(LayerPanelBase)
