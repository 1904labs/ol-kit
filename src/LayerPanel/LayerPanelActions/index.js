import React, { Component } from 'react'
import LayerPanelMenu from 'LayerPanel/LayerPanelMenu'

import PropTypes from 'prop-types'

import 'styled.css'

/**
 * @component
 * @category LayerPanel
 * @since 0.5.0
 */
class LayerPanelActions extends Component {
  constructor () {
    super()
    this.state = {
      anchorEl: null
    }
  }

  handleMenuClick = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { icon, children, translations } = this.props
    const { anchorEl } = this.state

    return (
      <div className='actionsContainer'>
        <button
          data-testid='LayerPanel.actionsButton'
          aria-label='more'
          aria-haspopup='true'
          onClick={this.handleMenuClick}
          size="large">
          {icon}
        </button>
        <LayerPanelMenu
          {...this.props}
          translations={translations}
          anchorEl={anchorEl}
          open={!!anchorEl}
          handleMenuClose={this.handleMenuClose}>
          {React.Children.map(children, child => child)}
        </LayerPanelMenu>
      </div>
    );
  }
}

LayerPanelActions.propTypes = {
  /** An bject with key/value pairs for translated strings */
  translations: PropTypes.object,

  /** An array of components to be displayed inside `LayerPanelMenu` (like `@mui/material/MenuItems`) */
  children: PropTypes.node,

  /** An icon component for the button to open the `LayerPanelMenu` (like `@mui/icons-material`) */
  icon: PropTypes.node.isRequired
}

LayerPanelActions.defaultProps = {
  icon: <MoreVertIcon />
}

export default LayerPanelActions
