import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connectToContext } from '~/src/Provider'
import MapDisplayElement from './MapDisplayElement'
import Slider from './Slider'

import './styled.css'

class SplitScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.sliderNode = undefined
  }

  componentDidMount() {
    const { startPosition } = this.state
    const { maps, forceUpdate } = this.props

    const { right } = maps[0]?.getTargetElement()?.getBoundingClientRect() || 0

    if (right === window.innerWidth && !startPosition) {
      this.setState({ startPosition: window.innerWidth / 2 })
      forceUpdate()
    } else {
      this.setState({ startPosition: right })
    }
  }

  removeMap = () => {
    const { maps, onMapRemoved, visibleMapCount } = this.props
    const mapIndex = visibleMapCount - 1
    const mapToRemove = maps[mapIndex]

    mapToRemove.setVisibleState(false)
    mapToRemove.setSyncedState(false)

    if (visibleMapCount - 1 === 2) this.setState({ startPosition: window.innerWidth / 2 })
    onMapRemoved(mapIndex)
  }

  addMap = () => {
    const { onMapAdded, maps, visibleMapCount } = this.props
    const nextMapIdx = visibleMapCount
    const mapToAdd = maps[nextMapIdx]

    mapToAdd.setVisibleState(true)
    mapToAdd.setSyncedState(true)

    if (visibleMapCount + 1 === 2) this.setState({ startPosition: window.innerWidth / 2 })
    onMapAdded(nextMapIdx)
  }

  toggleSyncMap = (i) => {
    const { maps, toggleSyncMap } = this.props
    const currentSyncState = maps[i].getSyncedState()

    // set the map sync state to the inverse
    maps[i].setSyncedState(!currentSyncState)

    toggleSyncMap()
  }

  render() {
    const { startPosition } = this.state
    const {
      translations, maps, syncedState, visibleState, visibleMapCount,
    } = this.props
    const disabled = false

    return (
      <div className="container">
        {disabled
          ? <div className="alert alert-warning" role="alert">{translations['_ol_kit.SplitScreen.disabled']}</div>
          : null}
        <div
          className="mapDisplayContainer"
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {visibleState.map((visible, i) => {
            const grow = i === 0 && visibleMapCount === 3

            if (visible) {
              return (
                <MapDisplayElement
                  key={i}
                  index={i}
                  map={maps[i]}
                  grow={grow}
                  mapNumber={i + 1}
                  synced={syncedState[i]}
                  toggleSyncMap={this.toggleSyncMap}
                  disabled={disabled}
                  translations={translations}
                />
              )
            }

            return null
          })}
        </div>
        {startPosition && visibleMapCount === 2
          && (
          <Slider
            initialPosition={startPosition}
            onDrag={() => this.props.forceUpdate()}
            ref={(node) => (this.sliderNode = node)}
          />
          )}
        <div className="controlStylesContainer">
          <div title={translations['_ol_kit.SplitScreen.addMap']} placement="right" disabled={false}>
            <div>
              <button
                className="mapControlButton"
                onClick={this.addMap}
                disabled={disabled || (visibleMapCount === maps.length)}
              >
                <i className="zmdi zmdi-plus" />
              </button>
            </div>
          </div>
          <div title={translations['_ol_kit.SplitScreen.removeMap']} placement="right" disabled={!disabled}>
            <div>
              <button
                className="mapControlButton"
                onClick={this.removeMap}
                disabled={disabled || visibleMapCount === 1}
              >
                <i className="zmdi zmdi-minus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SplitScreen.defaultProps = {
  forceUpdate: () => {},
  onMapAdded: () => {},
  onMapRemoved: () => {},
  toggleSyncMap: () => {},
}

SplitScreen.propTypes = {
  translations: PropTypes.object,
  visibleMapCount: PropTypes.number,
  maps: PropTypes.array,
  onMapRemoved: PropTypes.func,
  onMapAdded: PropTypes.func,
  forceUpdate: PropTypes.func,
  toggleSyncMap: PropTypes.func,
  syncedState: PropTypes.array,
  visibleState: PropTypes.array,
}

export default connectToContext(SplitScreen)
