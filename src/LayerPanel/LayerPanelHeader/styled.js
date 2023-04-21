import styled from 'styled-components'
import withStyles from '@mui/styles/withStyles';
import MaterialCardHeader from '@mui/material/CardHeader'

export const HeaderContainer = styled.div`
  height: 50px;
`

export const CardHeader = withStyles(() => ({
  title: {
    fontSize: '20px',
    fontWeight: '500'
  },
  root: {
    background: '#ededed',
    height: '75px'
  }
}))(MaterialCardHeader)

export const ActionsContainer = styled.div`
  margin-top: 4px;
  display: flex;
`
