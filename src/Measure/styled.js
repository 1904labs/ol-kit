import withStyles from '@mui/styles/withStyles';
import MaterialContainer from '@mui/material/Container'
import MaterialFormControl from '@mui/material/FormControl'

export const Container = withStyles(() => ({
  root: {
    padding: '0px'
  }
}))(MaterialContainer)

export const UomContainer = withStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '0px'
  }
}))(MaterialContainer)

export const FormControl = withStyles(() => ({
  root: {
    width: '35%'
  }
}))(MaterialFormControl)
