import React from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from '../Provider/utils' // direct import required here!
import { FlexMapStyled } from './styled'

function FlexMap (props) {
  const { children, index, maps, numberOfColumns, numberOfRows, total, visibleState } = props
  const totalMaps = total || maps.length
  const visibleMapCount = visibleState.filter(_ => _).length
  // TODO also check for index against total to see if its on a row with 1 or 2 columns
  const columns = numberOfColumns ||
    (visibleMapCount === 1 || visibleMapCount === 3) && (index !== 0) ? 1 : 2
  const rows = numberOfRows || (visibleMapCount > 2) ? 2 : 1

  return (
    <FlexMapStyled
      columns={columns}
      index={index}
      rows={rows}
      total={totalMaps}>
      {children}
    </FlexMapStyled>
  )
}

FlexMap.defaultProps = {
  maps: [],
  numberOfColumns: 0,
  numberOfRows: 0,
  total: 0,
  visibleState: []
}

FlexMap.propTypes = {
  index: PropTypes.number,
  maps: PropTypes.array,
  numberOfColumns: PropTypes.number,
  numberOfRows: PropTypes.number,
  total: PropTypes.number,
  visibleState: PropTypes.array
}

export default connectToContext(FlexMap)
