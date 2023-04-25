import React from 'react'
import Map from './Map'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Map',
  component: Map,
  tags: ['autodocs'],
  argTypes: {
    isMiltiMap: {
      control: {
        type: 'boolean',
        default: false
      }
    },
    logoPosition: {
      control: {
        type: 'select',
        options: ['left', 'right', 'none'],
        default: 'none'
      }
    },
    fullscreen: {
      control: {
        type: 'boolean',
        default: false
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <Story />
      </div>
    )
  ]
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    isMiltiMap: false,
    logoPosition: 'none',
    fullscreen: false
  }
}

// export const Secondary = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
