import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'styled.css'

/**
 * @component
 * @category Popup
 * @example ./example.md
 */
class PopupDataList extends Component {
  render () {
    const { attributes } = this.props

    const notGeom = key => !['geom', 'geometry'].includes(key.toLowerCase())

    return (
      <div className='container'>
        {Object.keys(attributes).filter(notGeom).map(key => (
          <div className='row' key={key}>
            <div className='key'>{key}:</div>
            <div className='value'>{`${attributes[key]}` /* This trick converts values to strings */}</div>
          </div>
        ))}
      </div>
    )
  }
}

PopupDataList.propTypes = {
  /** An object of stringify-able key/value pairs */
  attributes: PropTypes.object.isRequired
}

export default PopupDataList
