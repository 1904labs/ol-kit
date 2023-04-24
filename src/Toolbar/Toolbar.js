import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Toolbar extends React.Component {
  render () {
    const { children } = this.props

    return ReactDOM.createPortal(
      <div className='container'>
        <div container style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {children}
        </div>
      </div>,
      document.body
    );
  }
}

Toolbar.propTypes = {
  /** The content of the toolbar */
  children: PropTypes.node.isRequired
}

export default Toolbar
