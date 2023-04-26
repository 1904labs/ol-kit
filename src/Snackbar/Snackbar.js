import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useWrapperStyles = () => ({
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'black',
  },
  info: {
    backgroundColor: 'gray',
  },
  warning: {
    backgroundColor: 'amber',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 15,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

function SnackbarContentWrapper(props) {
  const classes = useWrapperStyles()

  const {
    className,
    message,
    variant,
    ...other
  } = props

  return (
    <div
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      )}
      {...other}
    />
  )
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

export default function Snackbar(props) {
  const {
    open, closeSnackbar, variant, message, duration,
  } = props

  const classes = useWrapperStyles()

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    closeSnackbar()
  }

  return ReactDOM.createPortal(
    <div
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      style={{ left: '8px', bottom: '8px' }}
    >
      <div
        onClose={handleClose}
        variant={variant}
        message={message}
        className={classes.margin}
      />
    </div>,
    document.body,
  )
}

Snackbar.defaultProps = {
  open: false,
  duration: 6000,
  variant: 'info',
  message: '',
}

Snackbar.propTypes = {
  closeSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool,
  duration: PropTypes.number,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  message: PropTypes.string,
}
