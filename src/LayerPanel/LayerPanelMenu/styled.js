import styled from 'styled-components'
import withStyles from '@mui/styles/withStyles';
import MaterialTypography from '@mui/material/Typography'
import MateriaSlider from '@mui/material/Slider'

export const OpacityTitle = withStyles(() => ({
  root: {
    fontSize: '12px',
    paddingTop: '0.3rem',
    color: '#868686'
  }
}))(MaterialTypography)

export const Slider = withStyles(() => ({
  root: {
    padding: '0'
  }
}))(MateriaSlider)

export const Menu = style.div`

`

export const MenuItem = styled.div`

`

export const OpacityWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`
