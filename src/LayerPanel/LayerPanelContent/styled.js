import React from 'react'
import { styled } from '@mui/material/styles'
import MaterialCardContent from '@mui/material/CardContent'

export const CardContent = styled(({ ...props }) => <MaterialCardContent {...props} />)({
  maxHeight: '565px',
  overflow: 'scroll',
  padding: props => props.padding ? props.padding : '10px 15px',
  marginBottom: '5px'
})
