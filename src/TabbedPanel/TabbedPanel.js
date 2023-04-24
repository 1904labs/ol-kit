import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from 'Provider'

import 'styled.css'

/**
 * @component
 * @category TabbedPanel
 * @since 1.4.0
 */
class TabbedPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeIndex: 0,
      showPanel: true
    }
  }

  handleChange = (_, activeIndex) => {
    this.setState({ activeIndex, showPanel: true })
  }

  togglePanel = () => {
    this.setState({ showPanel: !this.state.showPanel })
  }

  hideLayerPanel = () => {
    this.setState({ showPanel: false })
  }

  render () {
    const { children, translations } = this.props
    const { activeIndex, showPanel } = this.state

    return (
      <>
        <div
          className='card _popup_boundary'
          style={{ height: props.open ? `auto` : '48px' }}
          numoftabs={children.length || 1} >
          <div style={{ display: 'flex', background: 'rgb(237, 237, 237)' }}>
            <div className='initialTab' onClick={this.togglePanel} icon={showPanel ? <span className='KeyboardArrowDownIcon' data-testid='MapPanel.close' /> : <span className='KeyboardArrowRightIcon' data-testid='MapPanel.open' />} />
            <div
              className='tabs'
              open={showPanel}
              value={activeIndex}
              onChange={this.handleChange}
              variant='scrollable'
              scrollButtons='auto'>
              {React.Children.map(children, (child, i) => {
                if (child) return <div className='div' key={i + 1} label={child.props.tabIcon || child.props.label} />
              })}
            </div>
          </div>
          {translations && React.Children.toArray(children)[activeIndex]}
        </div>
      </>
    )
  }
}

TabbedPanel.defaultProps = {}

TabbedPanel.propTypes = {
  /** The pages of the panel (things like `LayerPanelPage` or `LayerStyler` components) */
  children: PropTypes.node.isRequired,

  /** A float number for the opacity of the LayerPanel. i.e. (0.5) */
  opacity: PropTypes.number,

  /** Object with key/value pairs for translated strings */
  translations: PropTypes.object
}

export default connectToContext(TabbedPanel)
