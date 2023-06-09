import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Flex, TabButton, TabList, TabsContainer, TabSlider } from './styled'

class SelectTabs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedIdx: props.selectedIdx
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps ({ selectedIdx }) {
    if (selectedIdx !== this.props.selectedIdx) this.setState({ selectedIdx })
  }

  onChange (i) {
    this.setState({ selectedIdx: i })

    if (this.props.onChange) this.props.onChange(i)
  }

  render () {
    const { children } = this.props
    const { selectedIdx } = this.state

    return (
      <TabsContainer>
        <TabList>
          <Flex>
            {React.Children.map(children, (child, i) => {
              return (<TabButton
                key={child.props.title}
                onClick={this.onChange.bind(this, i)}
                selected={selectedIdx === i}
                {...child.props}>
                {child.props.title}
                {selectedIdx === i ? <TabSlider /> : null}
              </TabButton>)
            })}
          </Flex>
        </TabList>
        <div style={{ maxHeight: 450, overflow: 'scroll' }}>
          {React.Children.toArray(children)[selectedIdx]}
        </div>
      </TabsContainer>
    )
  }
}

SelectTabs.propTypes = {
  /** Callback fired when the tabs change passed the index of the new tab being shown */
  onChange: PropTypes.func,

  /** The content to display in the tab */
  children: PropTypes.node.isRequired,

  /** The index of the currently shown popup */
  selectedIdx: PropTypes.number
}

SelectTabs.defaultProps = {
  selectedIdx: 0
}

export default SelectTabs
