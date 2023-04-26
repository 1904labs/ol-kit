import React from 'react'
import PropTypes from 'prop-types'

import '../styled.css'

function DragBarIcon(props) {
  return (
    <div className="svgIconWrapper">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" fill={props.color} viewBox="0 0 24 24">
        <path d="M11 21H9V3H11V21M15 3H13V21H15V3Z" />
      </svg>
    </div>
  )
}

DragBarIcon.propTypes = {
  color: PropTypes.string,
}

export default DragBarIcon
