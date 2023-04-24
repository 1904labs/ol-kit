import React from 'react'
import PropTypes from 'prop-types'

class PopoverBuilder extends React.Component {
  constructor () {
    super()

    this.state = {
      open: false
    }
  }

  handleClickButton = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    const { children, disabled, title } = this.props

    return (
      <React.Fragment>
        <button
          disabled={disabled}
          buttonRef={node => {
            this.anchorEl = node
          }}
          variant='contained'
          onClick={this.handleClickButton}>
          {title}
        </button>
        <div
          style={{
            overflowX: 'visible',
            overflowY: 'visible'
          }}
          open={open}
          onClose={this.handleClose}
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          {children}
        </div>
      </React.Fragment>
    )
  }
}

PopoverBuilder.propTypes = {
  /** Children to be shown inside the popover when open */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),

  /** If true the popover button will be disabled */
  disabled: PropTypes.bool,

  /** Title to show in the button which triggers the popover */
  title: PropTypes.string
}

export default PopoverBuilder
