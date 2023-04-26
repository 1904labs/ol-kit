import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styled.css'

class PopupZmdiButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }
  }

  render() {
    const { onClick, children } = this.props
    const { hover } = this.state

    return (
      <button
        className="icon"
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        hover={hover}
      >
        {children}
      </button>
    )
  }
}

PopupZmdiButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default PopupZmdiButton
