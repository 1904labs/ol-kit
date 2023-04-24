import React from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from '../Provider/utils' // direct import required here!

class FlexMap extends React.Component {
  render () {
    const { children, index, maps, numberOfColumns, numberOfRows, total, visibleState } = this.props
    const totalMaps = total || maps.length
    const visibleMapCount = visibleState.filter(_ => _).length

    let columns = numberOfColumns || (visibleMapCount % 2 === 1) ? 1 : 2
    const rows = numberOfRows || (visibleMapCount > 2) ? 2 : 1
    const adjustedColumns = p.columns - (p.total % 2)
    const breakPoint = p.index < adjustedColumns
    const needsAdjustment = !!(p.total % 2) && breakPoint

    // 3 maps
    if (visibleMapCount === 3) {
      columns = index === 0 ? 1 : 2
    }

    

    return (
      <div className='flexMapStyled'
        styled={{
          height: `${100 / p.numOfRows}%`,
          flexGrow: !p.index && (p.total % 2) ? '2' : '1',
          flexShrink: !p.index && (p.total % 2) ? '1' : '2',
          display: p.hidden ? 'none' : 'flex',
          width: needsAdjustment ? `${100 / adjustedColumns}%` : `${100 / p.columns}%`
        }}
        columns={columns}
        hidden={!visibleState[index]}
        index={index}
        numOfRows={rows}
        total={totalMaps}>
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
