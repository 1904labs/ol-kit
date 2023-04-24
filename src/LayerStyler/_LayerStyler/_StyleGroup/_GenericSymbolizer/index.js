import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ColorPicker from 'LayerStyler/_ColorPicker'

import { connectToContext } from 'Provider'

import 'styled.css'

// the incoming keys are based on the mark (point) symbolizer -- if the UI
// was based on a different symbolizer then these would have to change
const symbolizerKeyMap = {
  Mark: {
    color: 'color',
    radius: 'radius',
    strokeColor: 'strokeColor'
  },
  Line: {
    color: 'color',
    radius: 'width',
    strokeColor: 'color'
  },
  Fill: {
    color: 'color',
    radius: 'outlineWidth',
    strokeColor: 'outlineColor'
  }
}

// This generic symbolizer can be used to style any geom type
class GenericSymbolizer extends Component {
  aggregateChanges = (key, val) => {
    const { symbolizers, onSymbolizerChange } = this.props

    // this map uses the symbolizer kind to determine the proper key to use
    const newSymbolizers = symbolizers.map(s => {
      // ignore missing kind keys like 'Text' when updating the symbolizer
      if (!symbolizerKeyMap[s.kind]) return s
      const properKey = symbolizerKeyMap[s.kind][key]

      return { ...s, [properKey]: val }
    })

    onSymbolizerChange(newSymbolizers)
  }

  render () {
    const { translations } = this.props

    // this symbolizer UI is based off of the fill symbolizer
    const getSymbolizer = (symbls, kind) => symbls.find(s => kind.includes(s.kind))
    const markSymbolizer = getSymbolizer(this.props.symbolizers, ['Mark', 'Fill'])

    // if there is no mark symbolizer, we can't render this symbolizer
    if (!markSymbolizer) return null

    const { color, strokeWidth, outlineWidth, strokeColor, outlineColor, opacity = 1, radius } = markSymbolizer
    const widthValue = radius || strokeWidth || outlineWidth || 0

    return (
      <div className='container'>
        <div className='fourth'>
          {opacity >= 0.5 &&
            <Fragment>
              <div className='title'>{translations['_ol_kit.GenericSymbolizer.fill']}</div>
              <ColorPicker left={-8} handleSelect={val => this.aggregateChanges('color', val)} currentColor={color} />
            </Fragment>}
        </div>
        <div className='fourth'>
          <div className='title'>{translations['_ol_kit.GenericSymbolizer.width']}</div>
          <select
            style={{ padding: 'unset', marginTop: '10px', width: '100%' }}
            value={widthValue}
            onChange={e => this.aggregateChanges('radius', Number(e.target.value))} >
            {[widthValue, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option, i) => {
              return <option key={i} value={option}>{option}</option>
            })}
          </select>
        </div>
        <div className='fourth'>
          <div className='title'>{translations['_ol_kit.GenericSymbolizer.stroke']}</div>
          <ColorPicker left={172} handleSelect={val => this.aggregateChanges('strokeColor', val)} currentColor={strokeColor || outlineColor} />
        </div>
        <div className='fourth'>
          <div className='title'>{translations['_ol_kit.GenericSymbolizer.remove']}</div>
          <div className='trashcan' onClick={this.props.onSymbolizerDelete}>
            <div style={{ verticalAlign: 'top' }}>delete</div>
          </div>
        </div>
      </div>
    )
  }
}

GenericSymbolizer.propTypes = {
  /** Object with key/value pairs for translated strings */
  translations: PropTypes.object,

  /** Callback fired when the symbolizer changes */
  onSymbolizerChange: PropTypes.func.isRequired,

  /** Callback fired when the symbolizer is deleted */
  onSymbolizerDelete: PropTypes.func.isRequired,

  /** Array of symbolizer objects */
  symbolizers: PropTypes.array
}

GenericSymbolizer.defaultProps = {
  onSymbolizerChange: () => { },
  onSymbolizerDelete: () => { }
}

export default connectToContext(GenericSymbolizer)
