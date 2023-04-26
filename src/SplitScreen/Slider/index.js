import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import DragBarIcon from './svgIcons/DragBarIcon'

import './styled.css'

function Slider({ initialPosition, onDrag, innerRef }) {
  const limit = window.innerWidth * 0.2
  const leftBound = (window.innerWidth - limit - (window.innerWidth - initialPosition)) * -1
  const rightBound = window.innerWidth - initialPosition - limit

  return (
    ReactDOM.createPortal(
      <Draggable axis="x" bounds={{ left: leftBound, right: rightBound }} onDrag={onDrag}>
        <div
          className="dragBar"
          style={{
            height: props.height ? props.height : '100%',
            top: props.yOffset || '55',
            left: position - 5, // the left position is half of the width subtracted from the position to center the div
          }}
          position={initialPosition}
          yOffset={55}
          ref={innerRef}
        >
          <DragBarIcon color="lightgray" />
        </div>
      </Draggable>,
      document.body,
    )
  )
}

Slider.propTypes = {
  /** render slider in a specific position */
  initialPosition: PropTypes.number,

  /** Callback that get's fired when the slider is dragged */
  onDrag: PropTypes.func,

  /** A reference to the inner DOM node */
  innerRef: PropTypes.func,
}

export default Slider
