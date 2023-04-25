import React, { Component } from 'react'
import PropTypes from 'prop-types'

import en from 'locales/en'
import { connectToContext } from 'Provider'
import CLOSE from 'images/close_icon.svg'
import LEFT_ARROW from 'images/left_arrow.svg'
import RIGHT_ARROW from 'images/right_arrow.svg'
import ZmdiButton from '../_PopupZmdiButton'
import LoadingSpinner from '../_LoadingSpinner'
import DataList from '../PopupDataList'
import PopupTabs from '../PopupTabs'

import '../PopupHeader/styled.css'
import '../styled.css'

/**
 * @component
 * @category Popup
 * @example ./example.md
 */
class PopupDefaultPage extends Component {
  render () {
    const {
      translations,
      title,
      loading,
      currentTab,
      attributes,
      children,
      onNextPage,
      onPrevPage,
      pageCount,
      currentPage,
      onClose,
      onSettingsClick,
      subtitle
    } = this.props

    const isReactFragment = child => {
      try {
        return child.type.toString() === React.Fragment.toString()
      } catch (e) {
        return false
      }
    }

    // Sometimes an IA will supply a React.Fragment as the children properties. The fragment could contain multiple
    // Action Items. A fragment child element won't have a length, we so need to check the fragment's children.
    const childrenCount = isReactFragment(children) ? children.props.children.length : children.length

    return (
      <div className='heightContainer'>
        <div className='header'>
          <button className='close' onClick={onClose}><CLOSE data-testid='popup-page-close' /></button>
          {pageCount > 1 &&
            <div className='featureNavigator'>
              <ZmdiButton onClick={onPrevPage}>
                <LEFT_ARROW data-testid='popup-page-left-arrow' />
              </ZmdiButton>
              <div className='featureCount'>{`${currentPage} / ${pageCount}`}</div>
              <ZmdiButton onClick={onNextPage}>
                <RIGHT_ARROW data-testid='popup-page-right-arrow' />
              </ZmdiButton>
            </div>
          }
          <div className='headerDetails' loading={loading.toString()}>
            <div className='title'>{title}</div>
            <div className='subtitle'>{subtitle}</div>
          </div>
        </div>

        {loading
          ? (
            <LoadingSpinner style={{ marginTop: '70px', textAlign: 'center' }} />
          ) : (
            <div className='body'>
              <PopupTabs selectedIdx={currentTab}>
                <div title={translations['_ol_kit.PopupDefaultPage.details']} style={{ height: '170px', overflowY: 'scroll' }}>
                  {onSettingsClick &&
                    <div className='attributeSettings' onClick={onSettingsClick}>
                      <i className='zmdi zmdi-settings'></i>
                      <p style={{ fontSize: 'smaller', padding: '0px 5px', margin: 0 }}>{translations['_ol_kit.PopupDefaultPage.customize']}</p>
                    </div>
                  }
                  <DataList attributes={attributes} />
                </div>
                {childrenCount > 3
                  ? <div className='frame' title={translations['_ol_kit.PopupDefaultPage.actions']} height={169}>
                    {React.Children.map(children, item =>
                      item && React.cloneElement(item, {
                        ...item.props, onClose: onClose
                      })
                    )}
                  </div>
                  : <div title={translations['_ol_kit.PopupDefaultPage.actions']} style={{ height: '169px', overflowY: 'scroll' }}>
                    {React.Children.map(children, item =>
                      item && React.cloneElement(item, {
                        ...item.props, onClose: onClose
                      })
                    )}
                  </div>
                }
              </PopupTabs>
            </div>
          )
        }
      </div>
    )
  }
}

PopupDefaultPage.propTypes = {
  /** An object consisting of stringify-able key/value pairs */
  attributes: PropTypes.object,
  /** An array of components rendered in the actions tab */
  children: PropTypes.node,
  /** (passed by `PopupPageLayout`) The index of the currently shown page */
  currentPage: PropTypes.number,
  /** The index of the selected tab */
  currentTab: PropTypes.number,
  /** Render the page with a loading indicator and no details or actions */
  loading: PropTypes.bool,
  /** A callback fired when the close button is clicked */
  onClose: PropTypes.func,
  /** (passed by `PopupPageLayout`) Callback invoked when the next page should be shown */
  onNextPage: PropTypes.func,
  /** (passed by `PopupPageLayout`) Callback invoked when the previous page should be shown */
  onPrevPage: PropTypes.func,
  /** Set this callback to show settings cog */
  onSettingsClick: PropTypes.func,
  /** (passed by `PopupPageLayout`) Total number of pages */
  pageCount: PropTypes.number,
  /** The title shown centered in the top of the popup page */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /** Object with key/value pairs for translated strings */
  translations: PropTypes.shape({
    '_ol_kit.PopupDefaultPage.details': PropTypes.string,
    '_ol_kit.PopupDefaultPage.actions': PropTypes.string,
    '_ol_kit.PopupDefaultPage.customize': PropTypes.string
  }).isRequired,
  subtitle: PropTypes.string
}

PopupDefaultPage.defaultProps = {
  onClose: () => {},
  children: [],
  loading: false,
  currentTab: 0,
  attributes: {},
  translations: en
}

export default connectToContext(PopupDefaultPage)
