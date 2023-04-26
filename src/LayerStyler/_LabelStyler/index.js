import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connectToContext } from '~/src/Provider'
import ugh from '~/src/ugh'
import ColorPicker from '~/src/LayerStyler/_ColorPicker'

import './styled.css'

const DIVIDER = ':'
const UNITS = {
  ft: ['100ft', '125ft', '150ft', '250ft', '500ft', '750ft', '1000ft', '1250ft', '1500ft', '1750ft', '2000ft'],
  px: ['8px', '10px', '12px', '14px', '16px', '20px', '24px', '30px', '36px', '42px', '48px', '60px', '72px', '96px'],
}

class LabelStyler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uglyChecked: false,
    }
  }

  aggregateChanges = (key, value) => {
    const { style, onStylesChange } = this.props

    try {
      const newSymbolizer = {
        ...style.symbolizers[0],
        [key]: value,
      }

      style.symbolizers = [newSymbolizer]
    } catch (err) {
      ugh.error(err)

      throw new Error('Failed to aggregate changes to the style')
    }

    onStylesChange([style])
  }

  updateTextSizeUnit = (unit) => {
    this.aggregateChanges('size', unit === 'ft' ? '250ft' : '16px')
  }

  onAttributeChange = (attr, checked) => {
    const { style, onStylesChange } = this.props
    const newStyle = { ...style }

    try {
      const labelParts = newStyle.symbolizers[0].label.split(DIVIDER)

      let newLabel

      // if the item was previously checked,
      if (checked) {
        newLabel = labelParts.filter((p) => p !== `{{${attr}}}`).join(DIVIDER)
      } else {
        // the inner filter here removes empty strings which will add an extra divider
        // which we don't want when the .join() happens
        newLabel = [...labelParts.filter((p) => p), `{{${attr}}}`].join(DIVIDER)
      }

      newStyle.symbolizers[0].label = newLabel
    } catch (err) {
      ugh.error(err)

      throw new Error('Failed to modify the symbolizer label')
    }

    onStylesChange([newStyle])
  }

  clearCheckedItems = () => {
    const { style, onStylesChange } = this.props

    try {
      style.symbolizers[0].label = ''
    } catch (err) {
      ugh.error(err)

      throw new Error('There was an issue setting the symbolizer label')
    }

    onStylesChange([style])
  }

  onToggle = () => {
    const { style, onStylesChange } = this.props
    const { uglyChecked } = this.state
    const newStyleSymbolizer = {
      ...style.symbolizers[0],
      spaceAround: uglyChecked ? -5 : 5,
      partials: uglyChecked,
      repeat: uglyChecked ? 1 : 100,
      autoWrap: 100,
      maxDisplacement: 0,
      group: 'no',
      conflictResolution: !uglyChecked,
      goodnessOfFit: 0.1,
      labelAllGroup: false,
      polygonAlign: 'mbr',
    }

    onStylesChange([{ ...style, symbolizers: [newStyleSymbolizer] }])
    this.setState({ uglyChecked: !this.state.uglyChecked })
  }

  render() {
    const { uglyChecked } = this.state
    const { translations, attributes, style } = this.props

    if (!style) return <div>{translations['_ol_kit.LabelStyler.noLabelSupport']}</div>

    const symbolizer = style.symbolizers[0]
    const checkedAttributes = symbolizer.label.split(DIVIDER)
    const sizeUnit = symbolizer.size.slice(-2)

    return (
      <div>
        <div className="topControls">
          <div className="toggleContainer">
            <span>{translations['_ol_kit.LabelStyler.enableSmartLabels']}</span>
            <switch
              checked={uglyChecked}
              onChange={this.onToggle}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
          <div className="symbolizerContainer">
            <div className="color">
              <div className="title">{translations['_ol_kit.LabelStyler.color']}</div>
              <ColorPicker handleSelect={(val) => this.aggregateChanges('color', val)} currentColor={symbolizer.color} />
            </div>
            <div className="outline">
              <div className="title">{translations['_ol_kit.LabelStyler.outline']}</div>
              <ColorPicker handleSelect={(val) => this.aggregateChanges('haloColor', val)} currentColor={symbolizer.haloColor} />
            </div>
            <div className="size">
              <div className="title">{translations['_ol_kit.LabelStyler.textHeight']}</div>
              <select
                style={{ marginTop: '10px' }}
                value={symbolizer.size}
                onChange={(e) => this.aggregateChanges('size', e.target.value)}
              >
                {UNITS[sizeUnit].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="unit">
              <div className="title">{translations['_ol_kit.LabelStyler.textUnits']}</div>
              <select
                style={{ marginTop: '10px' }}
                value={sizeUnit}
                onChange={(e) => this.updateTextSizeUnit(e.target.value)}
              >
                <option key="px" value="px">{translations['_ol_kit.LabelStyler.pixels']}</option>
                <option key="ft" value="ft">{translations['_ol_kit.LabelStyler.feet']}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="attributeHeader">
          <div>{translations['_ol_kit.LabelStyler.chooseAttrs']}</div>
          {checkedAttributes.length && (
            <button className="button" onClick={this.clearCheckedItems}>
              <span className="buttonText">{translations['_ol_kit.LabelStyler.clear']}</span>
            </button>
          )}
        </div>
        <div className="attributeContainer" data-testid="ManageLayer.attributeContainer">
          {attributes.map((a) => {
            const checked = checkedAttributes.includes(`{{${a}}}`)

            return (
              <div
                className="attributeItem"
                style={{
                  color: props.checked ? '#fff' : '#000',
                  background: props.checked ? '#979797' : '#f5f5f5',
                  '&hover': {
                    background: props.checked ? '#979797' : '#f5f5f5',
                  },
                }}
                key={a}
                checked={checked}
                onClick={() => this.onAttributeChange(a, checked)}
              >
                {a}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

LabelStyler.propTypes = {
  /** Object with key/value pairs for translated strings */
  translations: PropTypes.object,

  /** array of label styles */
  style: PropTypes.object.isRequired,

  /** array of attributes for the layer */
  attributes: PropTypes.array.isRequired,

  /** callback when label styles change */
  onStylesChange: PropTypes.func.isRequired,
}

LabelStyler.defaultProps = {
  style: {},
  attributes: [],
  onStylesChange: () => {},
}

export default connectToContext(LabelStyler)
