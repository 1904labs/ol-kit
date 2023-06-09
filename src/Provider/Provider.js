import React from 'react'
import PropTypes from 'prop-types'
import en from 'locales/en'
import ugh from 'ugh'
import { ErrorBoundary } from 'ErrorBoundary'

// context is only created when <Provider> is implemented (see constructor)
export let ProviderContext = null

/** A higher order component that provides context to connectToContext wrapped children
 * @component
 * @example ./example.md
 * @category Provider
 * @since 1.0.0
 */
class Provider extends React.Component {
  constructor (props) {
    super(props)

    // state becomes an object of persistedStateKeys (or component names) with their persisted states'
    this.state = {
      mapContext: {}
    }

    // create context when <Provider> is included in component tree
    ProviderContext = React.createContext()
  }

  persistState = (persistedState, persistedStateKey) => {
    if (!persistedStateKey || typeof persistedStateKey !== 'string') return ugh.error('persistedStateKey (string; usually "ComponentName") must be passed as second arg to persistState(state, persistedStateKey)') // eslint-disable-line no-console

    this.setState({ [persistedStateKey]: persistedState })
  }

  addMapToContext = mapContext => {
    this.setState({ mapContext })
  }

  addEditFeatureToContext = editFeature => {
    this.setState({ editFeature })
  }

  getContextValue = () => {
    const { contextProps, map: mapProp, maps: mapsProp, translations } = this.props
    const { mapContext } = this.state
    const activeMap = mapProp || mapContext.map // map prop will override context map

    // if (!activeMap && !mapsProp.length) return ugh.throw('Provider requires either a \'map\' or \'maps\' prop to work!')

    // support multi-map components
    // default map reference to zeroith map from mapsProp if an array of maps has been passed
    const map = mapsProp.length ? mapsProp[0] : activeMap
    // default an array with single value of map prop if maps array has not been passed
    const maps = mapsProp.length ? mapsProp : [activeMap]

    return {
      addMapToContext: this.addMapToContext,
      map,
      maps,
      editFeature: this.state.editFeature,
      addEditFeatureToContext: this.addEditFeatureToContext,
      persistedState: this.state,
      persistState: this.persistState,
      translations,
      ...this.state.mapContext,
      ...contextProps
    }
  }

  render () {
    return (
      <ErrorBoundary floating={true}>
        <ProviderContext.Provider value={this.getContextValue()}>
          {this.props.children}
        </ProviderContext.Provider>
      </ErrorBoundary>
    )
  }
}

Provider.defaultProps = {
  contextProps: {},
  maps: [],
  translations: en
}

Provider.propTypes = {
  /** Pass components as children of Provider component */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  /** Add any custom props to context and they will be passed to all components wrapped by connectToContext */
  contextProps: PropTypes.object,
  /** OL map object (required if maps array is not passed) */
  map: PropTypes.object,
  /** Array of Openlayers map objects for components that support multi-map (this will override anything passed to map prop) */
  maps: PropTypes.array,
  /** Object with key/value pairs for component translation strings */
  translations: PropTypes.object,
  /** An Ol feature object that is being edited */
  editFeature: PropTypes.object
}

export default Provider
