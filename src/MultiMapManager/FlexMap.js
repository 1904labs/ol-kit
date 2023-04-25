import React from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from '../Provider/utils' // direct import required here!

import './styled.css'

class FlexMap extends React.Component {
  render () {
    const { children, index, maps, numberOfColumns, numberOfRows, total, visibleState } = this.props
    const totalMaps = total || maps.length
    const visibleMapCount = visibleState.filter(_ => _).length

    let columns = numberOfColumns || (visibleMapCount % 2 === 1) ? 1 : 2
    const rows = numberOfRows || (visibleMapCount > 2) ? 2 : 1
    const adjustedColumns = columns - (totalMaps % 2)
    const breakPoint = index < adjustedColumns
    const needsAdjustment = !!(totalMaps % 2) && breakPoint

    // 3 maps
    if (visibleMapCount === 3) {
      columns = index === 0 ? 1 : 2
    }

    return (
      <div className='flexMapStyled'
        styled={{
          height: `${100 / rows}%`,
          flexGrow: !index && (totalMaps % 2) ? '2' : '1',
          flexShrink: !index && (totalMaps % 2) ? '1' : '2',
          display: !visibleState[index] ? 'none' : 'flex',
          width: needsAdjustment ? `${100 / adjustedColumns}%` : `${100 / columns}%`
        }}>
        {children}
      </div>
    )
  }
}

FlexMap.defaultProps = {
  maps: [],
  numberOfColumns: 0,
  numberOfRows: 0,
  total: 0,
  visibleState: []
}

FlexMap.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  maps: PropTypes.array,
  numberOfColumns: PropTypes.number,
  numberOfRows: PropTypes.number,
  total: PropTypes.number,
  visibleState: PropTypes.array
}

export default connectToContext(FlexMap)
