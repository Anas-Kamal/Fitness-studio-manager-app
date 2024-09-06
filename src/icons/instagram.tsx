import * as React from 'react'
import { IconProps } from './types'

const Instagram = React.forwardRef<SVGSVGElement, IconProps>(({ size = 17, ...rest }, ref) => (
  <svg width={size} height={size} viewBox="0 0 17.15 17.211" ref={ref} {...rest}>
    <g fill="#241f1f" data-name="Group 3184">
      <path
        d="M8.574 17.208H4.019a3.812 3.812 0 01-3.978-3.874q-.056-4.753 0-9.51A3.8 3.8 0 013.969.009Q8.6 0 13.233.009a3.814 3.814 0 013.924 3.92q.013 4.659 0 9.313a3.83 3.83 0 01-3.978 3.97h-4.6zM1.69 8.588v3.807a3.065 3.065 0 003.2 3.173h7.41a3.074 3.074 0 003.223-3.2v-7.51a3.063 3.063 0 00-3.181-3.193q-3.732-.006-7.46 0a3.044 3.044 0 00-3.192 3.17c-.008 1.252 0 2.5 0 3.757z"
        data-name="Path 2358"
        transform="translate(-.013 -.001)"
      />
      <path
        d="M18.879 14.679a4.264 4.264 0 11-4.2-4.279 4.27 4.27 0 014.2 4.279zM14.6 17.426a2.761 2.761 0 10-2.751-2.772 2.768 2.768 0 002.751 2.772z"
        data-name="Path 2359"
        transform="translate(-6.034 -6.059)"
      />
      <path
        d="M30.239 9.359a.9.9 0 01-.86-.923.888.888 0 111.774.05.907.907 0 01-.91.872z"
        data-name="Path 2360"
        transform="translate(-17.119 -4.404)"
      />
    </g>
  </svg>
))

export default Instagram
