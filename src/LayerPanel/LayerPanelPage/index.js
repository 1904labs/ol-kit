import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelPage extends Component {
  render() {
    const { children, label, tabIcon } = this.props

    return (
      <div className="layerPanelPageContainer" label={label} tabIcon={tabIcon} data-testid="LayerPanel.page">
        {children}
      </div>
    )
  }
}

LayerPanelPage.propTypes = {
  /** An array of components (likely a LayerPanelHeader, LayerPanelContent, or LayerPanelFooter) */
  children: PropTypes.node,

  /** A string title of the page. Will be used as tab title. */
  label: PropTypes.string,

  /** Check LayerPanelPage example.md for more clarification */
  tabIcon: PropTypes.node,
}

export default LayerPanelPage
