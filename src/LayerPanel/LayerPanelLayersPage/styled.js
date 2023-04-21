import React from 'react'
import { styled } from '@mui/styles'
import MaterialListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

export const ListItemSecondaryAction = styled(({ ...props }) => <MaterialListItemSecondaryAction {...props} />)({
  right: '0px'
})
