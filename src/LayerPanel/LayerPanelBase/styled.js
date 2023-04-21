import React from 'react'
import MaterialCard from '@mui/material/Card'
import MaterialTabs from '@mui/material/Tabs'
import MaterialTab from '@mui/material/Tab'
import MaterialCheckbox from '@mui/material/Checkbox'
import MaterialCardContent from '@mui/material/CardContent'
import { styled } from '@mui/styles'

export const Card = styled(({ ...props }) => <MaterialCard {...props} />)({
  maxHeight: '645px',
  minHeight: props => `${200 + (props.numoftabs * 40)}px`,
  width: '400px',
  top: '80px',
  transition: 'all .3s',
  position: props => props.inline ? 'inline' : 'absolute',
  right: props => props.open ? '15px' : '-400px',
  opacity: 0.9
})

export const Tabs = styled(({ ...props }) => {
  const backgroundColor = props.open ? '#152357' : '#fff'

  return <MaterialTabs
    TabIndicatorProps={{ style: { backgroundColor } }} {...props} />
})({
  background: '#ededed',
  transition: 'all .3s',
  borderBottom: '1px solid lightgrey'
})

export const Tab = styled(({ ...props }) => <MaterialTab {...props} />)({
  minWidth: 'inherit',
  '&.Mui-selected': {
    color: '#152357'
  },
  '&:hover': {
    color: '#152357'
  }
})

export const InitialTab = styled(({ ...props }) => <MaterialTab {...props} />)({
  minWidth: 'inherit',
  '&.Mui-selected': {
    color: '#152357'
  },
  '&:hover': {
    color: '#152357'
  },
  top: '80px',
  background: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  position: 'absolute',
  right: '15px',
  opacity: 1
})

export const Checkbox = styled.input``

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 16px;
  background: #ededed;
  overflow: scroll;
`

export const IconButton = styled.button`

`
