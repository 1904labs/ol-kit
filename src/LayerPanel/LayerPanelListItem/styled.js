import withStyles from '@mui/styles/withStyles';
import MaterialListItem from '@mui/material/ListItem'
import MaterialListItemText from '@mui/material/ListItemText'

export const ListItem = withStyles(() => ({
  root: {
    padding: '0px !important', // without this, the root styles can override this and shift everything
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))(MaterialListItem)

export const ListItemText = withStyles(() => ({
  root: {
    padding: '10px 30px 10px 5px',
    overflowWrap: 'break-word'
  }
}))(MaterialListItemText)
