import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar } from 'Toolbar'

import 'styled.css'

export class DrawToolbar extends React.Component {
  render () {
    const { translations, showMeasurements, onShowMeasurements, onCancel, onFinish } = this.props

    return (
      <Toolbar>
        <div className='buttonCardActions'>
          <div className='leftCard'>
            <button color='secondary' onClick={onCancel}>
              {translations['_ol_kit.DrawToolbar.cancel']}
            </button>
          </div>
          <div className='centerCard' style={{ paddingLeft: '20px', marginLeft: '0px' }}>
            <label className='switch'>
              <input type='checkbox' checked={showMeasurements}
                onChange={onShowMeasurements} />
              <span className='slider round'></span>
            </label>

          </div>
          <div className='rightCard'>
            <button color='primary' onClick={onFinish}>
              {translations['_ol_kit.DrawToolbar.finish']}
            </button>
          </div>
        </div>
      </Toolbar>
    )
  }
}

DrawToolbar.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  translations: PropTypes.object,
  showMeasurements: PropTypes.bool,
  onShowMeasurements: PropTypes.func
}

DrawToolbar.defaultProps = {
  translations: {
    '_ol_kit.DrawToolbar.cancel': 'Cancel [ESC]',
    '_ol_kit.DrawToolbar.finish': 'Finish',
    '_ol_kit.DrawToolbar.showMeasurements': 'Show measurements'
  }
}

export default DrawToolbar
