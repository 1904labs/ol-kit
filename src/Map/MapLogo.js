import { useState } from 'react'
import PropTypes from 'prop-types'
import OL_KIT_MARK from '~/src/images/ol_kit_mark.svg'
import OL_KIT_MARK_BLACK from '~/src/images/ol_kit_mark_black.svg'

import './styled.css'

export default function MapLogo(props) {
  const { logoPosition, translations } = props
  const [isHovered, setHovered] = useState(false)

  return (
    logoPosition === 'none'
      ? null
      : (
        <div
          className="logoContainer"
          style={{
            justifyContent: logoPosition === 'right' ? 'flex-end' : 'flex-start',
          }}
        >
          <p className="logoText">{translations['_ol_kit.MapLogo.title']}</p>
          <div
            className="logo"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={translations['_ol_kit.MapLogo.hover']}
            href="https://ol-kit.com/"
            target="_blank"
          >
            {isHovered
              ? (
                <img
                  src={OL_KIT_MARK}
                  alt=""
                />
              )
              : (
                <img
                  src={OL_KIT_MARK_BLACK}
                  alt=""
                />
              )}
          </div>
        </div>
      )
  )
}

MapLogo.defaultProps = {
  logoPosition: 'right',
}

MapLogo.propTypes = {
  logoPosition: PropTypes.string,
  translations: PropTypes.object,
}
