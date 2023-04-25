import React from 'react'
import PropTypes from 'prop-types'
import MappyConcerned from './mappy_concerned.svg'
import MappyDead from './mappy_dead.svg'

/**
 * React ErrorBoundary component
 * @component
 */
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      abandonAllHope: false,
      attemptedReset: false,
      hasError: false
    }
  }

  componentDidCatch () {
    const { attemptedReset } = this.state

    if (attemptedReset) {
      // don't try to reset state after attemptedReset
      this.setState({ abandonAllHope: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { abandonAllHope, attemptedReset, hasError } = this.state

    // reset the attemptedReset bool whenever successful reset occurs so next error can also be reset instead of abandoned
    if (prevState.hasError && !prevState.attemptedReset && !abandonAllHope && attemptedReset && !hasError) {
      this.setState({ attemptedReset: false })
    }
  }

  static getDerivedStateFromError () { // eslint-disable-line handle-callback-err
    return { hasError: true }
  }

  render () {
    const { abandonAllHope, hasError } = this.state
    const { floating } = this.props

    return hasError
      ? (
        <div className={floating ? 'floatingBackground' : ''}>
          <div className={floating ? 'contianer floating' : 'container '}>
            <h1 className='header'>Something went wrong!</h1>
            {!abandonAllHope
              ? <MappyConcerned />
              : <MappyDead />}
            <em className='message'>{!abandonAllHope
              ? 'Have another go?'
              : 'This component is beyond recovery...'}
            </em>
            {!abandonAllHope
              ? <button
                className='button'
                onClick={() => this.setState({ attemptedReset: true, hasError: false })}>
                    Try Again
              </button>
              : null}
          </div>
        </div>
      )
      : this.props.children
  }
}

ErrorBoundary.propTypes = {
  /** pass components as children of ErrorBoundary which are rendered if there is no error */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  /** display error boundary with a modal-like background */
  floating: PropTypes.bool
}

export default ErrorBoundary
