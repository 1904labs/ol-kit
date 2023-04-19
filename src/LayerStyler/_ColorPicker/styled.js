import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const ColorPickerPositioner = styled.div`
  position: fixed;
  left: ${props => props.left}px;
  top: ${props => props.top + 20}px;
  box-shadow: rgba(0,0,0,0.2) 0px 2px 4px, rgba(0,0,0,0.02) 0px -1px 0px;
  z-index: 1;
`

export const CurrentColor = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 5px auto;
  margin-top: 20px;
  background: ${props => props.color};
  ${props => (props.color === '#ffffff' || props.color === '#fff') && 'border: 1px solid #ccc'};
  border-radius: 3px;
`
